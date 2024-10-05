import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
          },
        },
        slots: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    const courseData = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      zoomLink: course.zoomLink,
      price: course.price,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      tutor: {
        id: course.tutor.id,
        name: course.tutor.name,
      },
      slots: course.slots.map((slot) => ({
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
      })),
    }));

    return NextResponse.json({ courses: courseData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ courses: [] }, { status: 500 });
  }
}