import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import SidebarNav from "./_components/sidebar-nav";

export const metadata: Metadata = {
    title: "Settings",
    description: "Change the settings for your user and teams",
};

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/settings",
    },
    {
        title: "Account",
        href: "/settings/account",
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
    },
    {
        title: "Display",
        href: "/settings/display",
    },
];

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0 5">
                    <h2 className="text-2xl font-bold tracking-light">
                        Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
