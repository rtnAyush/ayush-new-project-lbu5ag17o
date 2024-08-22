import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export const GET = async (req: Request, { params }: any ) => {
    const { id } = params;
    try {
        const users = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
    };