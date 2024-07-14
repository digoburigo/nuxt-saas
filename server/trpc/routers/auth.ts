import { z } from "zod";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { createDate, TimeSpan } from "oslo";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { lucia } from "~~/server/utils/auth";
import { sendEmail } from "~~/server/utils/send-email";

import EmailVerifyUserEmail from "~/emails/EmailVerifyUserEmail.vue";
import EmailForgotPassword from "~/emails/EmailForgotPassword.vue";
import type { EmailForgotPasswordProps, EmailVerifyUserEmailProps } from "~/emails/email-props";

export const authRouter = router({
	logout: protectedProcedure.mutation(async ({ ctx: { event } }) => {
		if (!event.context.session?.id) {
			throw new TRPCError({ code: "BAD_REQUEST" });
		}
		await lucia.invalidateSession(event.context.session.id);
		appendHeader(
			event,
			"Set-Cookie",
			lucia.createBlankSessionCookie().serialize(),
		);
		event.context.session = null;
		event.context.user = null;
	}),

	login: publicProcedure
		.input(z.object({ email: z.string().email(), password: z.string() }))
		.mutation(async ({ ctx: { db, event }, input: { email, password } }) => {
			const existingUser = await db.user.findFirst({
				where: {
					email,
				},
			});

			if (!existingUser || !existingUser?.password) {
				throw new TRPCError({ code: "BAD_REQUEST" });
			}

			const validPassword = await new Argon2id().verify(
				existingUser.password,
				password,
			);

			if (!validPassword) {
				throw new TRPCError({ code: "BAD_REQUEST" });
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
		.mutation(async ({ ctx: { db, event }, input: { email, password, firstName, lastName } }) => {
			const hashedPassword = await new Argon2id().hash(password);
			try {
				const user = await db.user.create({
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
					"Set-Cookie",
					lucia.createSessionCookie(session.id).serialize(),
				);

				const token = generateId(40);
				await db.token.create({
					data: {
						user: { connect: { id: user.id } },
						type: "VERIFY_EMAIL",
						expiresAt: createDate(new TimeSpan(2, "h")),
						token,
						sentTo: user.email,
					},
				});

				await sendEmail({
					to: email,
					subject: "Confirmar email",
					emailTemplate: EmailVerifyUserEmail,
					props: {
						email,
						token,
					} satisfies EmailVerifyUserEmailProps,
				});
			}
			catch (e) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
			}
			return true;
		}),

	forgotPassword: publicProcedure
		.input(z.object({ email: z.string().email() }))
		.mutation(async ({ ctx: { db }, input: { email } }) => {
			try {
				const user = await db.user.findUnique({
					where: { email },
				});

				if (user) {
					await db.token.deleteMany({
						where: { type: "RESET_PASSWORD", userId: user.id },
					});

					const token = generateId(40);
					await db.token.create({
						data: {
							user: { connect: { id: user.id } },
							type: "RESET_PASSWORD",
							expiresAt: createDate(new TimeSpan(2, "h")),
							token,
							sentTo: user.email,
						},
					});

					await sendEmail({
						to: email,
						subject: "Recuperar senha",
						emailTemplate: EmailForgotPassword,
						props: {
							token,
							email,
						} satisfies EmailForgotPasswordProps,
					});
				}

				await new Promise(resolve => setTimeout(resolve, 750));
			}
			catch (e) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
			}
		}),

	resetPassword: publicProcedure
		.input(z.object({ token: z.string(), password: z.string(), confirmPassword: z.string() }))
		.mutation(async ({ ctx: { db }, input: { token, password, confirmPassword } }) => {
			try {
				if (password !== confirmPassword) {
					throw new TRPCError({ code: "BAD_REQUEST" });
				}

				const tokenFound = await db.token.findFirst({
					where: { token },
				});

				if (!tokenFound || tokenFound?.type !== "RESET_PASSWORD" || tokenFound?.expiresAt < new Date(tokenFound.expiresAt)) {
					throw new TRPCError({ code: "BAD_REQUEST" });
				}

				const user = await db.user.findUnique({
					where: { id: tokenFound?.userId },
				});

				if (!user) {
					throw new TRPCError({ code: "BAD_REQUEST" });
				}

				if (user) {
					await db.token.deleteMany({
						where: { type: "RESET_PASSWORD", userId: user.id },
					});

					const hashedPassword = await new Argon2id().hash(password);

					await db.user.update({
						where: { id: user.id },
						data: {
							password: hashedPassword,
						},
					});
				}

				await new Promise(resolve => setTimeout(resolve, 750));
			}
			catch (e) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
			}
		}),

	verifyEmail: protectedProcedure
		.input(z.object({ token: z.string() }))
		.mutation(async ({ ctx: { db }, input: { token } }) => {
			try {
				const tokenFound = await db.token.findFirst({
					where: { token },
				});

				if (!tokenFound || tokenFound?.type !== "VERIFY_EMAIL" || tokenFound?.expiresAt < new Date(tokenFound.expiresAt)) {
					throw new TRPCError({ code: "BAD_REQUEST" });
				}

				const user = await db.user.findUnique({
					where: { id: tokenFound?.userId },
				});

				if (!user) {
					throw new TRPCError({ code: "BAD_REQUEST" });
				}

				if (user) {
					await db.token.deleteMany({
						where: { type: "VERIFY_EMAIL", userId: user.id },
					});

					await db.user.update({
						where: { id: user.id },
						data: {
							emailVerified: new Date(),
						},
					});
				}

				await new Promise(resolve => setTimeout(resolve, 750));
			}
			catch (e) {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
			}
		}),
});
