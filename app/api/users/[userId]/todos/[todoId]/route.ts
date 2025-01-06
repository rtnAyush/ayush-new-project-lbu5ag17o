import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

type TodoRequestBody = {
  title: string;
  description?: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string; todoId: string } },
) {
  try {
    const userId = params.userId;
    const todoId = params.todoId;

    const body: TodoRequestBody = await request.json();

    const { title, description } = body;
    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 },
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        title,
        description,
      },
    });

    await sendEmail({
      to: 'user@example.com',
      template: {
        subject: 'Todo Updated',
        html: '<h1>Your todo has been updated successfully</h1>',
        text: 'Your todo has been updated successfully',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Todo item updated successfully',
        data: {
          todoId,
          title,
          description,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}