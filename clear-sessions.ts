import { db } from "./src/lib/db";
import { sessions } from "./src/lib/db/schema";

async function main() {
  await db.delete(sessions);
  console.log("Sessions cleared");
  process.exit(0);
}
main();
