"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/auth-client";
import Link from "next/link";

export default function Login() {

    const handleGoogleSignIn = async() => {
        await client.signIn.social({
            provider: "google",
            callbackURL: "/home",
        })
    }

    const handleAppleSignIn = async() => {
        await client.signIn.social({
            provider: "apple",
            callbackURL: "/home",
        })
    }

    return (
        <div className="h-full flex flex-col items-center">
            <div className="w-80 items-center flex-grow flex flex-col">
                <div className="container flex-grow flex flex-col items-center justify-center">
                    <div className="flex flex-col">
                        <h1 className="text-center text-2xl font-bold">
                            Log in to Dashbored
                        </h1>
                        <div className="flex flex-col space-y-2 pt-8">
                            <Button onClick={handleGoogleSignIn}>
                                <Icons.google className="mr-2 h-4 w-4" />
                                Continue with Google
                            </Button>
                            <Button onClick={handleAppleSignIn}>
                                <Icons.apple className="mr-2 h-4 w-4" />
                                Continue with Apple
                            </Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-col space-y-2">
                            <Link href="/login/email">
                                <Button className="w-full" variant="outline">
                                    <Icons.logo className="mr-2 h-4 w-4" />
                                    Continue with Email
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-solid border-t h-24 w-full flex flex-col items-center justify-center">
                <Link href="/signup">
                    <Button variant="link" className="text-blue-500">
                        Don&apos;t have an account? Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
