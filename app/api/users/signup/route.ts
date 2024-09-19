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

}