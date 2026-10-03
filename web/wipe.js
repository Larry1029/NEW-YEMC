const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const dbUrl = envFile.split('\n').find(l => l.startsWith('DATABASE_URL')).split('=')[1].replace(/['"]/g, '').trim();

import('@neondatabase/serverless').then(async ({ Pool }) => {
  const pool = new Pool({ connectionString: dbUrl });
  try {
    const getAccounts = await pool.query('SELECT provider FROM auth_accounts');
    console.log('Current accounts:', getAccounts.rows);
    await pool.query('DELETE FROM auth_accounts');
    
    const getUsers = await pool.query('SELECT email FROM auth_users');
    console.log('Current users:', getUsers.rows);
    await pool.query('DELETE FROM auth_users');
    
    console.log('Successfully cleared users and accounts.');
  } catch (err) {
    console.error('Error clearing DB:', err);
  } finally {
    await pool.end();
  }
}).catch(console.error);
