"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BluetoothIcon, LoaderCircleIcon, LoaderPinwheel } from "lucide-react";
import { useAuth } from "@/context/authContext";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous errors

    try {
      setLoading(true);
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        setLoading(false);
        throw new Error(data.error || 'Login failed');
      }

      // Save the token in document cookie
      login(data.token, data.user);
      
      // Navigate to dashboard after successful login
      setLoading(false);
      router.push(`/dashboard/${data.user?.role}`);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex justify-center">
            <BluetoothIcon className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full">
                {loading ? <LoaderCircleIcon /> : 'Sign in'}
              </Button>
            </div>
          </form>
          {/* Rest of the component remains the same */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;