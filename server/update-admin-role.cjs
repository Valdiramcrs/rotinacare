const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

async function updateAdminRole() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados');
    
    const email = 'contato@valdiramcassimiro.com';
    
    // Verificar usuário atual
    const checkResult = await client.query(
      'SELECT id, email, name, role FROM users WHERE email = $1',
      [email]
    );
    
    if (checkResult.rows.length === 0) {
      console.log('❌ Usuário não encontrado:', email);
      return;
    }
    
    const user = checkResult.rows[0];
    console.log('\n📊 Usuário atual:');
    console.log('  ID:', user.id);
    console.log('  Email:', user.email);
    console.log('  Nome:', user.name);
    console.log('  Role:', user.role);
    
    // Atualizar para admin
    if (user.role === 'admin') {
      console.log('\n✅ Usuário já é admin!');
    } else {
      await client.query(
        'UPDATE users SET role = $1 WHERE email = $2',
        ['admin', email]
      );
      console.log('\n✅ Role atualizado para ADMIN!');
    }
    
    // Verificar atualização
    const verifyResult = await client.query(
      'SELECT id, email, name, role FROM users WHERE email = $1',
      [email]
    );
    
    const updatedUser = verifyResult.rows[0];
    console.log('\n📊 Usuário atualizado:');
    console.log('  ID:', updatedUser.id);
    console.log('  Email:', updatedUser.email);
    console.log('  Nome:', updatedUser.name);
    console.log('  Role:', updatedUser.role);
    
    console.log('\n🎉 SUCESSO! Agora você pode fazer login no painel admin.');
    console.log('\n📧 Email: contato@valdiramcassimiro.com');
    console.log('🔑 Senha: RotinaCare2024!');
    console.log('🌐 URL: https://admin.rotinacare.com');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

updateAdminRole();
