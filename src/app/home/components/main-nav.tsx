import { cn } from "@/lib/utils";
import Link from "next/link";

type MainNavProps = React.HTMLAttributes<HTMLElement>;

export const MainNav: React.FC<MainNavProps> = ({ className, ...props }) => {
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            <Link
                href="/home"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </Link>
            <Link
                href="/clients"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Clients
            </Link>
            <Link
                href="/settings"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Settings
            </Link>
        </nav>
    );
};
