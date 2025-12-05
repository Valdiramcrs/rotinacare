const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

async function createAdmin() {
  try {
    const email = 'valdiramcrs@gmail.com';
    const password = 'Mudar@123';
    const name = 'Valdir Admin';
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Verificar se usuário já existe
    const existingUser = await db.execute(`
      SELECT id, email, role FROM users WHERE email = $1
    `, [email]);
    
    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      console.log('✅ Usuário já existe:', user);
      
      // Atualizar para admin se não for
      if (user.role !== 'admin') {
        await db.execute(`
          UPDATE users SET role = 'admin', password = $1 WHERE email = $2
        `, [hashedPassword, email]);
        console.log('✅ Usuário atualizado para admin!');
      } else {
        // Atualizar apenas a senha
        await db.execute(`
          UPDATE users SET password = $1 WHERE email = $2
        `, [hashedPassword, email]);
        console.log('✅ Senha atualizada!');
      }
    } else {
      // Criar novo usuário admin
      const id = uuidv4();
      await db.execute(`
        INSERT INTO users (id, email, password, name, role, created_at)
        VALUES ($1, $2, $3, $4, 'admin', NOW())
      `, [id, email, hashedPassword, name]);
      console.log('✅ Usuário admin criado!');
    }
    
    console.log('\n📧 Email:', email);
    console.log('🔑 Senha:', password);
    console.log('👤 Role: admin');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

createAdmin();
