import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Validate and parse the userId parameter
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({}, { status: 400 });
    }

    // Fetch the enrolled courses for the student
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            zoomLink: true,
          },
        },
      },
    });

    // Map the enrollments to the response format
    const enrolledCourses = enrollments.map((enrollment) => ({
      course_id: enrollment.course.id,
      title: enrollment.course.title,
      zoom_link: enrollment.course.zoomLink,
    }));

    // Send the response with enrolled courses
    return NextResponse.json(enrolledCourses, { status: 200 });

  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    return NextResponse.json([], { status: 500 });
  }
}