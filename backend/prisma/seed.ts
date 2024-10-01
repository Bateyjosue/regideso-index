import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@reg.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@reg.com',
      role: 'ADMIN',
      password_hash: '',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@reg.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@reg.com',
      role: 'USER',
      password_hash: '',
    },
  });

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
