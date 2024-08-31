import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET method to fetch all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST method to create a new user
export async function POST(request: Request) {
  const { name, email } = await request.json();
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
