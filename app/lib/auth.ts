import { betterAuth } from "better-auth"
import { prismaAdapter } from "@better-auth/prisma-adapter"
import { nextCookies } from "better-auth/next-js"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"

const neonAdapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
  arrayMode: false,
  fullResults: false,
})

// @ts-ignore
const prisma = new PrismaClient({ adapter: neonAdapter })

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
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