import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
    };