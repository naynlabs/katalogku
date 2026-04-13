import { db } from "./src/lib/db";
import { users } from "./src/lib/db/schema";
import * as dotenv from 'dotenv';
dotenv.config();

async function check() {
  const all = await db.select().from(users);
  console.log(JSON.stringify(all, null, 2));
  process.exit(0);
}

check();
