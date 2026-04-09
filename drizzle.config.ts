import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load .env.local (Next.js convention)
config({ path: ".env.local" });

// Parse DATABASE_URL for drizzle-kit (requires individual params for MySQL)
const dbUrl = new URL(process.env.DATABASE_URL!.replace("mysql://", "http://"));

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port) || 4000,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // Remove leading "/"
    ssl: {
      rejectUnauthorized: false,
    },
  },
  verbose: true,
  strict: true,
});
