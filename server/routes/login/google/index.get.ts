import { generateCodeVerifier, generateState } from "arctic";

import { google } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ["openid", "email", "profile"];
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes,
  });

  setCookie(event, "google_oauth_state", state, {
    path: "/",
    secure: import.meta.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  setCookie(event, "code_verifier", codeVerifier, {
    path: "/",
    secure: import.meta.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return sendRedirect(event, url.toString());
});
