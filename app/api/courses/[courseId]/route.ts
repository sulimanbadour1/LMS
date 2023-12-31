import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request,
    { params }: { params: { courseId: string } }) {
    try {

        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();



        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Check if the user is the owner of the course
        const course = await db.course.update({
            where: {
                id: courseId,
                userId

            },
            data: {
                ...values
            }
        });

        return NextResponse.json(course)

    } catch (error) {
        console.log("[COURSES_ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}