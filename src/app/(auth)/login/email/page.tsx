"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function EmailLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("handleSubmit")

        await client.signIn.email(
            {
                email: email,
                password: password,
                callbackURL: "/home",
            },
            {
                onRequest: () => {
                    console.log("onRequest");
                    setIsLoading(true);
                },
                onSuccess: () => {
                    console.log("onSuccess");
                    setIsLoading(false);
                },
                onError: (ctx) => {
                    console.log("onError");
                    setIsLoading(false);
                    toast.error(ctx.error.name, {
                        description: ctx.error.message,
                    });
                },
            }
        );
    };

    return (
        <div className="h-full flex flex-col items-center">
            <div className="w-80 items-center flex-grow flex flex-col">
                <div className="container flex-grow flex flex-col items-center justify-center">
                    <div className="flex flex-col">
                        <h1 className="text-center text-2xl font-bold">
                            Log in to Dashbored
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-2 pt-4"
                        >
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                autoComplete="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                {isLoading
                                    ? "Logging in..."
                                    : "Continue with Email"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border-solid border-t h-24 w-full flex flex-col items-center justify-center">
                <Link href="/signup">
                    <Button variant="link" className="text-blue-500">
                        Don't have an account? Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
