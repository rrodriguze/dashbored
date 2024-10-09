import { betterAuth } from "better-auth";
import { reactResetPasswordEmail } from "./email/reset-password";
import { resend } from "./email/resend";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const from = process.env.BETTER_AUTH_EMAIL || 'Dashbored <onboarding@socialdashbored.com>';

export const auth = betterAuth({
    database: new LibsqlDialect({
        url: process.env.TURSO_DATABASE_URL || "libsql://auth-rrodriguze.turso.io",
        authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjgzMzYxMjIsImlkIjoiNTA2YjBiOTUtZjYzYi00MGI5LWE2MzktOTRiNjViN2Q0M2I5In0.Wk4fDu5hlI94A-a1KxHJv78yA3iewzNgFC97MRYzZcrpHH7I8m76sKCgXa3eAEmO6ouDMC_TGHmXFLMQLyb4Dg",
    }),
    emailAndPassword: {
        enabled: true,        
        async sendResetPassword(token, user) {
            await resend.emails.send({
                from,
                to: user.email,
                subject: "Reset your password",
                react: reactResetPasswordEmail({
                    username: user.email,
                    resetLink: process.env.VERCEL_PROJECT_PRODUCTION_URL
                    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/reset-password/${token}`
                    : `${process.env.LOCALHOST_URL}/reset-password/${token}`
                }),
            });
        },
        sendEmailVerificationOnSignUp: true,
        async sendVerificationEmail(email, url) {
            await resend.emails.send({
                from,
                to: email,
                subject: "Verify your email address",
                html: `<a href="${url}">Verify your email address</a>`,
            });
        },
    },
    socialProviders: {
        apple: {
            clientId: process.env.APPLE_CLIENT_ID || "",
            clientSecret: process.env.APPLE_CLIENT_SECRET || "",
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    }
});
