import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            <header className="p-4">
                <div className="mx-auto flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold">
                        Dashbored
                    </a>
                    <nav className="flext items-center space-x-4">
                        <Link
                            href="/contact"
                            className="hover:text-text-gray-300 text-sm transition-colors"
                        >
                            Contact
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline">Sign Up</Button>
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}
