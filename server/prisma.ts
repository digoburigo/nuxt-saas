// import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

// export interface Env {
//   DB: D1Database;
// }

// const adapter = new PrismaD1(env.DB);

// export const prisma = new PrismaClient({ adapter });
export const prisma = new PrismaClient();
