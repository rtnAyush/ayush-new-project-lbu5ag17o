"use client"
import { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { LoaderCircleIcon } from "lucide-react"

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()
  const router = useRouter()

  const signUpUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      })
      const { token, user } = await response.json()
      login(token, user)
      
      setLoading(false);
      if (role) {
        router?.push(`/dashboard/${role}`);
      }
      else{
        router?.push("/dashboard/user")
      }

    } catch (err: any) {
      console.error('Signup error:', err);
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Sign up for an account</h2>
          <p className="mt-4 text-muted-foreground">
            Already have an account?{" "}
            <Link href="#" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign in
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              setName("John Doe")
              setRole("tutor")
            }}
          >
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutor">Tutor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full" onClick={signUpUser}>
              { loading ? <LoaderCircleIcon /> : "Sign up" }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;