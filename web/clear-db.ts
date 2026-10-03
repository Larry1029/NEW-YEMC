import { config } from 'dotenv';
import { Pool } from '@neondatabase/serverless';

config({ path: '.env.local' });

async function clearUsers() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const getUsers = await pool.query('SELECT email FROM auth_users');
    console.log('Current users:', getUsers.rows);
    
    const deleteUsers = await pool.query('DELETE FROM auth_users RETURNING email');
    console.log('Deleted users:', deleteUsers.rows);
    
    const getAccounts = await pool.query('SELECT provider FROM auth_accounts');
    console.log('Current accounts:', getAccounts.rows);
    
    const deleteAccounts = await pool.query('DELETE FROM auth_accounts RETURNING provider');
    console.log('Deleted accounts:', deleteAccounts.rows);
    
  } catch (err) {
    console.error('Error clearing DB:', err);
  } finally {
    await pool.end();
  }
}

clearUsers();
