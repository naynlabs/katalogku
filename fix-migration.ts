import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function run() {
  console.log("Applying manual fix for teks_config...");
  try {
    await db.execute(sql`
      ALTER TABLE stores 
      ADD COLUMN teks_config json;
    `);
    console.log("Teks Config column added successfully!");
  } catch (error: any) {
    // Ignore error if column already exists
    if (error.errno === 1060) {
      console.log("Column teks_config already exists");
    } else {
      console.error("Migration failed:", error);
      process.exit(1);
    }
  }
  process.exit(0);
}

run();
