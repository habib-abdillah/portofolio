import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { Kysely } from "kysely"
import { NeonDialect } from "kysely-neon"
import { neon } from "@neondatabase/serverless"
import { kyselyAdapter } from "@better-auth/kysely-adapter"

const db = new Kysely<any>({
  dialect: new NeonDialect({
    neon: neon(process.env.DATABASE_URL!),
  }),
})

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://habibabdillah.my.id",
  secret: process.env.BETTER_AUTH_SECRET || "build-time-secret-placeholder",
  database: kyselyAdapter(db, {
    type: "postgres",
  }),
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "https://habibabdillah.my.id",
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const allowedEmails = [process.env.ADMIN_EMAIL!]
          if (!allowedEmails.includes(user.email)) {
            throw new Error("Unauthorized")
          }
          return { data: user }
        },
      },
    },
  },
  plugins: [nextCookies()],
})