import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // To hash password securely

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@capitawave.com';
  const adminPassword = '12345678';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        fname: 'Super',
        lname: 'Admin',
        username: 'superadmin',
        email: adminEmail,
        password: hashedPassword, 
        street: '1010 Admin St',
        state: 'Admin State',
        zip: '00000',
        city: 'Admin City',
        country: 'Admin Country',
        phone: '0000000000',
        role: 'ADMIN', 
      },
    });

    console.log('Super admin created!');
  } else {
    console.log('Super admin already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
