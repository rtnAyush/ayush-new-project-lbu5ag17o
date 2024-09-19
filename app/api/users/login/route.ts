import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

type LoginRequestBody = {
  email: string
  password: string
}

export async function POST(request: Request) {
  
}