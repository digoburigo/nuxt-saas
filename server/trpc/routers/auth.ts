import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { Argon2id } from 'oslo/password';
import { lucia } from '~~/server/utils/auth';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx: { dbAdmin, event }, input: { email, password } }) => {

      const existingUser = await dbAdmin.user.findFirst({
        where: {
          email,
        },
      });

      if (!existingUser) {
        throw createError({
          message: "Algum erro ocorreu. Tente novamente.",
          statusCode: 400,
        });
      }

      const validPassword = await new Argon2id().verify(
        existingUser.password,
        password,
      );

      if (!validPassword) {
        throw createError({
          message: "Algum erro ocorreu. Tente novamente.",
          statusCode: 400,
        });
      }

      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
      );

      return true;
    }),

  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string(), firstName: z.string(), lastName: z.string() }))
    .mutation(async ({ ctx: { dbAdmin, event }, input: { email, password, firstName, lastName } }) => {
      const hashedPassword = await new Argon2id().hash(password);
      console.log(`hashedPassword:`, hashedPassword)
      try {
        const user = await dbAdmin.user.create({
          data: {
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
          },
        });

        const session = await lucia.createSession(user.id, {});
        appendHeader(
          event,
          'Set-Cookie',
          lucia.createSessionCookie(session.id).serialize()
        );
      } catch (e) {
        console.log(`e:`, e)
        // if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        //   throw createError({
        //     message: 'Username already used',
        //     statusCode: 500,
        //   });
        // }
        throw createError({
          message: 'An unknown error occurred',
          statusCode: 500,
        });
      }
      return true;
    }),
});
