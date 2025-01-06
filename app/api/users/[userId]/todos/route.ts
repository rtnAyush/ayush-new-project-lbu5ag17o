import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

type TodoRequestBody = {
  title: string;
  description?: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    const body: TodoRequestBody = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 },
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });

    await sendEmail({
      to: 'user@example.com',
      template: {
        subject: 'Todo Added Successfully',
        html: `<h1>Your todo "${title}" was added successfully!</h1>`,
        text: `Your todo "${title}" was added successfully!`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Todo item added successfully',
        data: {
          todoId: todo.id,
          title: todo.title,
          description: todo.description,
          createdAt: todo.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error adding todo:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}