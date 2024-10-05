import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the request body
type EnrollmentRequestBody = {
  studentId: number;
  courseId: number;
  payment: {
    amount: number;
    paymentMethod: string;
  };
};

// Define the POST method handler for enrollment
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: EnrollmentRequestBody = await request.json();

    // Validate required fields
    const { studentId, courseId, payment } = body;
    if (!studentId || !courseId || !payment || !payment.amount || !payment.paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields or incorrect format.' }, { status: 400 });
    }

    // Create the enrollment and associated payment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        paymentStatus: 'Pending',
        payment: {
          create: {
            amount: payment.amount,
            paymentMethod: payment.paymentMethod,
            status: 'Completed',
          },
        },
      },
    });

    // Update the payment status to completed
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { paymentStatus: 'Completed' },
    });

    // Send a success response with the enrollment ID and payment status
    return NextResponse.json({
      message: 'Enrollment successful.',
      enrollmentId: enrollment.id,
      paymentStatus: 'Completed',
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error processing enrollment:', error);
    return NextResponse.json({}, { status: 500 });
  }
}