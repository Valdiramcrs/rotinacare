import { db } from './index.js';
import { users } from './schema.js';
import { hashPassword } from '../lib/auth';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Criar usuário admin
    const adminPassword = await hashPassword('admin123');
    await db.insert(users).values({
      email: 'admin@rotinacare.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@rotinacare.com / admin123');

    // Criar usuário de teste
    const testPassword = await hashPassword('teste123');
    await db.insert(users).values({
      email: 'teste@exemplo.com',
      password: testPassword,
      name: 'Usuário Teste',
      role: 'patient',
    });
    console.log('✅ Test user created: teste@exemplo.com / teste123');

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seed();
