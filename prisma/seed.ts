import { faker } from "@faker-js/faker";
// import { createClient } from "@libsql/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { PrismaClient } from "@prisma/client";

// SEED TURSO
// const libsql = createClient({
//   url: `${import.meta.env.DATABASE_URL}`,
//   authToken: `${import.meta.env.DATABASE_AUTH_TOKEN}`,
// });

// const adapter = new PrismaLibSQL(libsql);

// const prisma = new PrismaClient({
//   adapter,
// });

// SEED LOCAL
const prisma = new PrismaClient();

async function main() {
  console.info("Seeding...");

  // USERS
  const [_, user1, user2, team1, team2] = await Promise.all([
    createUser({
      globalRole: "SUPERUSER",
    }),
    createUser({}),
    createUser({}),
    createTeam(),
    createTeam(),
  ]);

  // TEAM 1
  await connectTeamUser({
    role: "OWNER",
    userId: user1.id,
    teamId: team1.id,
  });
  await connectTeamUser({
    role: "MEMBER",
    userId: user2.id,
    teamId: team1.id,
  });

  // TEAM 2
  await connectTeamUser({
    role: "ADMIN",
    userId: user1.id,
    teamId: team2.id,
  });

  // CUSTOMERS
  await createCustomer({ ownerId: user1.id, teamId: team1.id });
  await createCustomer({ ownerId: user2.id, teamId: team1.id });
  await createCustomer({ ownerId: user1.id, teamId: team2.id });
  await createCustomer({ ownerId: user2.id, teamId: team2.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

async function createUser({
  password,
  globalRole,
}: {
  password?: string;
  globalRole?: string;
}) {
  const firstName = faker.person.firstName();

  const info = {
    firstName,
    lastName: faker.person.lastName(),
    email: `${firstName.toLocaleLowerCase()}${faker.number.int({ min: 100, max: 999 })}@email.com`,
  };

  const hashedPassword = await new (
    await import("oslo/password")
  ).Argon2id().hash(password || "12345678");

  const user = await prisma.user.create({
    data: {
      ...info,
      globalRole: globalRole || "USER",
      password: hashedPassword,
    },
  });
  console.info("Created user: ", user);
  return user;
}

async function createTeam() {
  const team = await prisma.team.create({
    data: {
      name: faker.company.name(),
      slug: `${faker.company.buzzVerb()}-${faker.number.int({ min: 100, max: 999 })}`,
    },
  });
  console.info("Created team: ", team);
  return team;
}

async function connectTeamUser({
  role,
  userId,
  teamId,
}: {
  role: string;
  userId: string;
  teamId: number;
}) {
  const teamUser = await prisma.teamUser.create({
    data: {
      role,
      teamId,
      userId,
    },
  });
  console.info(`Connected user ${userId} to team ${teamId}`);
  return teamUser;
}

async function createCustomer({
  teamId,
  ownerId,
}: {
  teamId: number;
  ownerId: string;
}) {
  try {
    const name = faker.person.fullName();
    const info = {
      documentNumber: faker.finance.accountNumber(),
      documentType: "CPF",
      email: `test-${faker.number.int({ min: 100, max: 999 })}@email.fr`,
      name,
      phone: faker.phone.number(),
      slug: name.replace(/\W+/g, "-").toLowerCase(),
    };
    const customer = await prisma.customer.create({
      data: {
        ...info,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });
    console.info("Created customer: ", customer);
    return customer;
  }
  catch (error) {
    console.error(`error:`, error);
  }
}
