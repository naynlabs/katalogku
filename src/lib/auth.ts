import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),

  // Email + Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Bisa diaktifkan nanti
  },

  // Google OAuth
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session setiap 24 jam
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache cookie selama 5 menit
    },
  },

  // Custom user fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "MERCHANT",
        input: false, // Tidak bisa diubah dari client
      },
    },
  },

  // Trusted origins
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
  ],
});

// Export type for use in other files
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
