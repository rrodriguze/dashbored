"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, useState } from "react";

const groups = [
    {
        label: "Personal Account",
        accounts: [{ label: "Roberto Rodriguez", value: "personal" }],
    },
    {
        label: "Clients",
        accounts: [
            { label: "Acme Inc.", value: "acme-inc" },
            { label: "Monsters Inc.", value: "monsters" },
        ],
    },
];

type Account = (typeof groups)[number]["accounts"][number];
type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface ClientSwitcherProps extends PopoverTriggerProps {}

export default function ClientSwitcher({ className }: ClientSwitcherProps) {
    const [open, setOpen] = useState(false);
    const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account>(
        groups[0].accounts[0]
    );

    return (
        <Dialog
            open={showNewAccountDialog}
            onOpenChange={setShowNewAccountDialog}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a client"
                        className={cn("w-[200px] justify-between", className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedAccount.value}.png`}
                                alt={selectedAccount.label}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedAccount.label}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search client..." />
                        <CommandList>
                            <CommandEmpty>No client found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup
                                    key={group.label}
                                    heading={group.label}
                                >
                                    {group.accounts.map((account) => (
                                        <CommandItem
                                            key={account.value}
                                            onSelect={() => {
                                                setSelectedAccount(account);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${account.value}.png`}
                                                    alt={account.label}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>
                                                    SC
                                                </AvatarFallback>
                                            </Avatar>
                                            {account.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedAccount.value ==
                                                        account.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewAccountDialog(true);
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Client
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create client</DialogTitle>
                    <DialogDescription>
                        Add a new client to manage their social media.
                    </DialogDescription>
                </DialogHeader>
                <>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="plan">Subscription plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">
                                            Free
                                        </span>{" "}
                                        -{" "}
                                        <span className="text-muted-foreground">
                                            Trial for two weeks
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        <span className="font-medium">Pro</span>{" "}
                                        -{" "}
                                        <span className="text-muted-foreground">
                                            $9/month per client
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewAccountDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
