import { generateId } from 'lucia';
import { TimeSpan, createDate } from 'oslo';
import { prisma } from '~/server/prisma';
import { forgotPasswordSchema } from '~/validators';
import { sendEmail } from '~/server/utils/send-email';


export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => forgotPasswordSchema.safeParse(body))

  if (!result.success) {
    throw result.error.issues
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email: result.data.email },
    });

    if (user) {
      await prisma.token.deleteMany({
        where: { type: 'RESET_PASSWORD', userId: user.id },
      });

      const token = generateId(40);
      await prisma.token.create({
        data: {
          user: { connect: { id: user.id } },
          type: 'RESET_PASSWORD',
          expiresAt: createDate(new TimeSpan(2, 'h')),
          token,
          sentTo: user.email,
        },
      });

      await sendEmail({
        to: result.data.email,
        subject: 'Recuperar senha',
        emailTemplate: 'EmailForgotPassword.vue',
        props: {
          token,
          email: result.data.email,
        },
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 750));
    }
  } catch (e) {
    throw createError({
      message: 'Algum erro ocorreu',
      statusCode: 500,
    });
  }
});
