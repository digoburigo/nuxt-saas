import { Argon2id } from "oslo/password";
import { z } from "zod";
import { prisma } from "~~/server/prisma";

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => resetPasswordSchema.safeParse(body))

  if (!result.success) {
    throw result.error.issues
  }

  try {
    const token = await prisma.token.findFirst({
      where: { token: result.data.token },
    });

    if (!token || token?.type !== "RESET_PASSWORD" || token?.expiresAt < new Date(token.expiresAt)) {
      throw "Token inválido.";
    }

    const user = await prisma.user.findUnique({
      where: { id: token?.userId },
    });

    if (!user) {
      throw "Algum erro ocorreu.";
    }

    if (user) {
      await prisma.token.deleteMany({
        where: { type: "RESET_PASSWORD", userId: user.id },
      });

      const hashedPassword = await new Argon2id().hash(result.data.password);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      });

    } else {
      await new Promise((resolve) => setTimeout(resolve, 750));
    }
  } catch (e) {
    console.log(`e:`, e)
    throw createError({
      message: "Algum erro ocorreu",
      statusCode: 500,
    });
  }
});
