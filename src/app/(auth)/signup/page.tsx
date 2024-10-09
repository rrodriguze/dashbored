"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/auth-client";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<
        "google" | "apple" | "email" | null
    >(null);

    const handleEmailSignup = async () => {
        await client.signUp.email(
            {
                email: email,
                password: password,
                name: name,
            },
            {
                onRequest: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    client.user.revokeSessions()
                    setIsLoading(false);
                    setEmail("");
                    setName("");
                    setPassword("");
                    setPasswordVerify("");
                    toast.success("Account created!", {
                        description: "Check your Email inbox to verify your account."
                    })
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

    const handleAuthClick = (method: "google" | "apple" | "email") => {
        setAuthMethod(method);
        setIsDialogOpen(true);
    };

    const handleAccessCodeSubmit = () => {
        if (accessCode === "SPICY") {
            setIsDialogOpen(false);
            switch (authMethod) {
                case "google":
                    handleGoogleSignup();
                    break;
                case "apple":
                    handleAppleSignup();
                    break;
                case "email":
                    handleEmailSignup();
                    break;
            }
            setAccessCode("");
            setAuthMethod(null);
        } else {
            toast.error("Invalid Access Code");
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-background">
            <Card>
                <CardHeader className="w-[350px]">
                    <CardTitle className="text-2xl">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Enter you email below to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAuthClick("email");
                        }}
                    >
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1 5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 5">
                                <Label htmlFor="password-verify">
                                    Verify your password
                                </Label>
                                <Input
                                    id="password-verify"
                                    type="password"
                                    value={passwordVerify}
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPasswordVerify(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Mail className="mr-2 h-4 w-4" />
                            )}
                            {isLoading
                                ? "Creating account..."
                                : "Sign Up with Email"}
                        </Button>
                    </form>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={() => handleAuthClick("google")}
                            variant="outline"
                        >
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button
                            onClick={() => handleAuthClick("apple")}
                            variant="outline"
                        >
                            <Icons.apple className="mr-2 h-4 w-4" />
                            Apple
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <p className="mt-4 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our
                <br />
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Access Code</DialogTitle>
                        <DialogDescription>
                            Please enter the access code to join the beta.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="Access Code"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                    <DialogFooter>
                        <Button onClick={handleAccessCodeSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* <div className="w-80">
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
            </div> */}
            <Toaster theme="dark" richColors={true} />
        </div>
    );
}
