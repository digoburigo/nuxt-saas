import { Argon2id } from 'oslo/password';

import { prisma } from '../../prisma';

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

  const hashedPassword = await new Argon2id().hash(password);

  try {
    const firstName = formData.get('firstName')?.toString() ?? 'john';
    const lastName = formData.get('lastName')?.toString() ?? 'doe';

    const user = await prisma.user.create({
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
});
