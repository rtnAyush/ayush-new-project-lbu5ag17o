import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any ) => {
    const { id } = params;
    try {
        connectToDatabase();
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
    };