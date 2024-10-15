import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Dashbored",
    description: "Social Media Management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script defer src="https://data.ruki.es/script.js" data-website-id="1a06a365-54e6-4fb2-a2d4-ec34c478ddc5" />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased overscroll-none",
                    GeistSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
