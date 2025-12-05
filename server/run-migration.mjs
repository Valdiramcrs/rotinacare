import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres.pcthuczsisjnnettogln:123Mud@r@@aws-0-us-west-2.pooler.supabase.com:6543/postgres'
});

const sql = fs.readFileSync('/home/ubuntu/rotinacare/server/migrations/add_multiple_roles.sql', 'utf8');

try {
  const result = await pool.query(sql);
  console.log('✅ Migração executada com sucesso!');
  console.log(result);
} catch (error) {
  console.error('❌ Erro:', error.message);
} finally {
  await pool.end();
}
