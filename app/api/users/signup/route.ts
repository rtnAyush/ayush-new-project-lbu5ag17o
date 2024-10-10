import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

type SignupRequestBody = {
  email: string
  password: string
  role?: string,
  name?: string
}

export async function POST(request: Request) {
  try {
   
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 })
  }
}