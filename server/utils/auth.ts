import { Lucia } from "lucia";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { User } from "@prisma/client";
import { Google } from "arctic";
import { prisma } from "../prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// IMPORTANT!
		attributes: {
			// set to `true` when using HTTPS
			secure: !import.meta.dev,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
		};
	},
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<User, "id">;
	}
}

const config = useRuntimeConfig();

export const google = new Google(
	config.googleClientId,
	config.googleClientSecret,
	config.googleRedirectUri,
);
