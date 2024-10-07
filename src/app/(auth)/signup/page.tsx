"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSignup = async () => {
        console.log("handle email signup");

        await client.signUp.email(
            {
                email: email,
                password: password,
                name: email,
                callbackURL: "/home",
            }, {
                onResponse: () => {
                    console.log("onResponse");
                    setIsLoading(false);
                },
                onRequest: () => {
                    console.log("onRequest");
                    setIsLoading(true);
                },
                onError: (ctx) => {
                    console.log("onError");
                    setIsLoading(false);
                    toast.error("Upss! Error while signing up.", {
                        description: ctx.error.message,
                    });
                },
            }
        );
    };

    const handleGoogleSignup = async () => {
        await client.signIn.social({
            provider: "google",
            callbackURL: "/home",
        });
    };

    const handleAppleSignup = async () => {
        await client.signIn.social({
            provider: "apple",
            callbackURL: "/home",
        });
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-80">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">
                            Create an account
                        </CardTitle>
                        <CardDescription>
                            Enter you email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button
                                variant="outline"
                                onClick={handleGoogleSignup}
                            >
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleAppleSignup}
                            >
                                <Icons.apple className="mr-2 h-4 w-4" />
                                Apple
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleEmailSignup}
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {isLoading
                                ? "Creating account..."
                                : "Create account"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <Toaster theme="dark" richColors={true} />
        </div>
    );
}
