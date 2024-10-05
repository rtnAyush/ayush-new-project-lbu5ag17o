'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { SettingsIcon, Folder } from "lucide-react";
import SettingsPage from './settings/page';
import BrowseCoursesPage from './browse_courses/page';
import EnrolledCoursesPage from './enrolled_courses/page';

const pages = [
  {
    name: "Accounts",
    id: "AccountsPage",
    icon: SettingsIcon,
    component: <SettingsPage />
  },
  {
    name: "Browse Courses",
    id: "BrowseCoursesPage",
    icon: Folder,
    component: <BrowseCoursesPage />
  },
  {
    name: "Enrolled Courses",
    id: "EnrolledCoursesPage",
    icon: Folder,
    component: <EnrolledCoursesPage />
  },
]

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('AccountsPage');

  return (
    <main className="flex w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-14 flex-col border-r bg-background sm:w-60 mt-[50px]">
        <div className="flex flex-col items-center gap-4 px-2 py-5 sm:items-start sm:px-6">
          <nav className="flex flex-col items-start gap-2 text-sm font-medium">
            {
                pages.map((item: any, index: any) => (
                    <Button
                        variant={'outline'}
                        key={index}
                        onClick={() => setActivePage(item.id)}
                        className="flex w-52 items-center rounded-lg mt-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                    <item.icon className="h-4 w-4 mr-1" />
                    <span>{item?.name}</span>
                    </Button>
             ))
            }
          </nav>
        </div>
      </aside>
      <div className="flex-1 pl-14 sm:pl-60">
      {pages.map((item) => {
        if (item.id === activePage) {
          return React.cloneElement(item.component, { key: item.name });
        }
        return null;
      })}
      {!pages.some((item) => item.id === activePage) && (
        <div>Page not found</div>
      )}
      </div>
    </main>
  );
}