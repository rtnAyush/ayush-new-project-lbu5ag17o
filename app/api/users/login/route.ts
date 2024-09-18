import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

type LoginRequestBody = {
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: LoginRequestBody = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Find the user by email
    const user = await prisma.users.findUnique({ where: { email } })
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = user.password == password;
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '10h' } // Token expires in 1 hour
    )

    // Return the token
    console.log('User logged in:', { token, user: user })
    return NextResponse.json({ token, user: user }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}