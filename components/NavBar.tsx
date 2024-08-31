'use client';

import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { BluetoothIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDashboard = isClient && pathname.includes('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full bg-muted py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-start px-4 md:px-6">
        <Link href="#" className="flex items-center mr-8" prefetch={false}>
          <BluetoothIcon className="h-6 w-6 text-muted-foreground" />
          <span className="ml-2 text-lg font-bold text-muted-foreground">My Inc</span>
        </Link>
        {isClient && (
          <>
            {!isDashboard && (
              <nav className="hidden md:flex flex-1 justify-end">
                <ul className="flex items-center space-x-6">
                  <li>
                    <Button variant={'outline'} onClick={() => router?.push('/login')} className="hover:text-accent transition-colors">
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button variant={'outline'} onClick={() => router?.push('/register')} className="hover:text-accent transition-colors">
                      Sign Up
                    </Button>
                  </li>
                </ul>
              </nav>
            )}
            {isDashboard && (
              <div className="flex items-center space-x-4 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                        Logout
                      </Button>
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