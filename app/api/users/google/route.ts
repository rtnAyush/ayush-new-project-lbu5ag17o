import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use a strong secret

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "default_password", // Assuming a default password or handle password creation
        },
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn: "10d" } // Token expiration
    );

    // Return the user data and token in the desired format
    return NextResponse.json(
      {
        success: true,
        message: "User successfully authenticated",
        data: { user, token },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
      },
      { status: 500 }
    );
  }
}