import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@makarandnarwekar.com';
  const username = 'Makarand';
  const password = 'Makarand@2012';
  const name = 'Makarand Narwekar';

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('Admin user already exists!');
    console.log('Email:', email);
    return;
  }

  // Create admin user
  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('Email:', email);
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('');
  console.log('You can now login at: http://localhost:3000/admin/login');
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
