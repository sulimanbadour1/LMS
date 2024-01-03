import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { courseId: String } }
) {
    try {
        const { userId } = auth();
        const { url } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // Check if user is course owner
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId as string,
                userId: userId
            },

        })

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const attachment = await db.attachment.create({
            data: {
                url: url,
                name: url.split("/").pop(),
                courseId: params.courseId as string,
            }
        })

        return NextResponse.json(attachment);


    } catch (error) {
        console.log("Course Attachments POST Error: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}