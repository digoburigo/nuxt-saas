import { OAuth2RequestError } from "arctic";
import { prisma } from "~~/server/prisma";
import { google } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(event, "code_verifier") ?? null;

  if (
    !code
    || !state
    || !codeVerifier
    || !storedState
    || state !== storedState
  ) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await googleUserResponse.json();

    const existingAccount = await prisma.account.findFirst({
      where: {
        provider: "google",
        providerAccountId: googleUser.sub,
      },
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.userId, {});
      appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
      return sendRedirect(event, "/app");
    }

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          image: googleUser.picture,
          name: googleUser.name,
          emailVerified: googleUser.email_verified ? new Date() : null,
        },
      });

      await tx.account.create({
        data: {
          provider: "google",
          providerAccountId: googleUser.sub,
          type: "oauth",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return user;
    });

    const session = await lucia.createSession(newUser.id, {});
    appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
    return sendRedirect(event, "/app");
  }
  catch (e) {
    console.log("e:", e);

    if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

interface GoogleUser {
  sub: string;
  name?: string;
  given_name: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
  locale?: string;
}
