'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/authContext';

const SettingsPage = () => {
  const { authUser, setAuthUser } = useAuth();
  const [name, setName] = useState(authUser?.name || '');
  const [message, setMessage] = useState('');
 

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`/api/users/${authUser?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: authUser?.id,  // Assuming `authUser` contains the user's ID
          name,
        }),
      });

      const data = await res.json();
      const newUser = {...authUser, name: name};
      setAuthUser(newUser);
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Error updating profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <main className="p-4 sm:p-10">
      <div className="grid gap-10">
              <h1 className="text-2xl font-bold">Account</h1>
              <div className="grid gap-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name} // Use the state variable `name`
                        onChange={(e) => setName(e.target.value)} // Update the state when input changes
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="john@example.com" value={authUser?.email || ''} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleUpdateProfile}>Update Profile</Button>
                  </CardFooter>
                  {message && <p>{message}</p>}
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your account password.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Change Password</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all its data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button >Delete Account</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
    </main>
  );
};

export default SettingsPage;