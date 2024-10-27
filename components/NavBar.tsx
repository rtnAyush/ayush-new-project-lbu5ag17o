"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { BluetoothIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDashboard = isClient && pathname.includes("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <Link
          href={isDashboard ? "/dashboard" : "/"}
          className="flex items-center space-x-2 mr-4"
          prefetch={false}
        >
          <BluetoothIcon className="h-6 w-6" />
          <span className="font-bold">My Inc</span>
        </Link>

        {isClient && (
          <>
            {!isDashboard && (
              <>
                <nav className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
                  <Button asChild variant="ghost">
                    <Link href={"/login"}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href={"/register"}>Sign Up</Link>
                  </Button>
                </nav>
              </>
            )}
            {isDashboard && (
              <div className="flex-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="User Avatar"
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => router.push("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/settings")}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => signOut({ callbackUrl: "/login" })}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
