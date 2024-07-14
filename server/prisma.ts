import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const config = useRuntimeConfig();

const libsql = createClient({
	url: config.tursoDatabaseUrl,
	authToken: config.tursoAuthToken,
});

const adapter = new PrismaLibSQL(libsql);
const prismaTurso = new PrismaClient({ adapter });

const prismaLocal = new PrismaClient();

export const prisma = import.meta.env.NODE_ENV === "production" ? prismaTurso : prismaLocal;
