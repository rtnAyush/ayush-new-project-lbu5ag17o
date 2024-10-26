import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as LoginRequestBody;
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          token: jwt.sign({ email: email, id: "1" }, process.env.JWT_SECRET!, {
            expiresIn: "10h",
          }),
          user: {
            id: "123",
            username: "nilesh",
            name: "Nilesh",
            email: email,
            role: "user",
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
