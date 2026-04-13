import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function run() {
  console.log("Applying manual migrations...");
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS platform_banks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bank_name VARCHAR(50) NOT NULL,
        account_number VARCHAR(50) NOT NULL,
        account_name VARCHAR(100) NOT NULL,
        logo_url TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS subscription_invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_id VARCHAR(30) NOT NULL UNIQUE,
        store_id INT NOT NULL,
        plan_id INT NOT NULL,
        amount DECIMAL(12, 0) NOT NULL,
        promo_code_id INT,
        payment_proof_url TEXT,
        status ENUM('PENDING', 'WAITING_CONFIRMATION', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES subscription_plans(id),
        FOREIGN KEY (promo_code_id) REFERENCES promocodes(id) ON DELETE SET NULL
      );
    `);
    
    console.log("Migrations applied successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
  process.exit(0);
}

run();
