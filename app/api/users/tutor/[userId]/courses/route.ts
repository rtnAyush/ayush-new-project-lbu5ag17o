import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CourseRequestBody = {
  title: string;
  description?: string;
  zoom_link?: string;
  price: number;
  class_slots: {
    start_datetime: string;
    end_datetime: string;
  }[];
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const body: CourseRequestBody = await request.json();
    const { title, description, zoom_link, price, class_slots } = body;

    if (!title || !price || !Array.isArray(class_slots)) {
      return NextResponse.json({ error: 'Missing required fields or incorrect format.' }, { status: 400 });
    }

    const tutor = await prisma.user.findFirst({
      where: { id: userId, role: 'tutor' },
    });

    if (!tutor) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const course = await prisma.course.create({
      data: {
        tutorId: userId,
        title,
        description,
        zoomLink: zoom_link,
        price,
        slots: {
          create: class_slots.map((slot) => ({
            startTime: new Date(slot.start_datetime),
            endTime: new Date(slot.end_datetime),
          })),
        },
      },
    });

    return NextResponse.json({
      message: 'Course created successfully.',
      course_id: course.id.toString(),
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const courses = await prisma.course.findMany({
      where: { tutorId: userId },
      include: {
        slots: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    const responseCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      zoom_link: course.zoomLink,
      price: course.price,
      created_at: course.createdAt.toISOString(),
      updated_at: course.updatedAt.toISOString(),
      class_slots: course.slots.map((slot) => ({
        start_datetime: slot.startTime.toISOString(),
        end_datetime: slot.endTime.toISOString(),
      })),
    }));

    return NextResponse.json({ courses: responseCourses }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}