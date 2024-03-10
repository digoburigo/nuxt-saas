import { Argon2id } from 'oslo/password';

import { prisma } from '../prisma';

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const email = formData.get('email');
  if (typeof email !== 'string' || email.length < 3) {
    throw createError({
      message: 'Invalid email',
      statusCode: 400,
    });
  }
  const password = formData.get('password');
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: 'Invalid password',
      statusCode: 400,
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize()
  );
});
