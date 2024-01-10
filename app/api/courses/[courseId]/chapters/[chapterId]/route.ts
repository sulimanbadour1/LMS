import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    {
        params
    }: {
        params: {
            courseId: string,
            chapterId: string
        }
    }
) {
    try {
        const { userId } = auth()
        const { isPublished, ...values } = await req.json(); //isPublished is not part of the chapter model, so we need to remove it from the values
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })


        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId

            }
        })

        if (!ownCourse) return new NextResponse("Forbidden", { status: 403 })

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values
            }
        })


        //Handle Video Upload

        return NextResponse.json(chapter)

    } catch (error) {
        console.log("[Chapters] [PATCH] error", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}