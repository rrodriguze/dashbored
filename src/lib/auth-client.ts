import { createAuthClient } from "better-auth/react"

export const client = createAuthClient({
    baseURL: process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.LOCALHOST_URL
})