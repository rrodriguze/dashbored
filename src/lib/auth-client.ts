import { createAuthClient } from "better-auth/react"

export const client = createAuthClient({
    baseURL: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || `http://${process.env.LOCALHOST_URL}`
})