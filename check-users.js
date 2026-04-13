const { db } = require('./src/lib/db');
const { users } = require('./src/lib/db/schema');

async function checkUsers() {
  const allUsers = await db.select().from(users);
  console.log('--- Users in Database ---');
  console.log(allUsers.map(u => ({ email: u.email, name: u.name })));
  process.exit(0);
}

checkUsers();
