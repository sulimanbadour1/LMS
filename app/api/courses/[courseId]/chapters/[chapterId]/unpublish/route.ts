import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
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
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })
        if (!ownCourse) {
            return new NextResponse("Forbidden", { status: 403 })
        }
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })
        if (!chapter) {
            return new NextResponse("Not Found", { status: 404 })
        }
        const updatedChapter = await db.chapter.update({
            where: {
                id: params.chapterId
            },
            data: {
                isPublished: false
            }
        })
        return NextResponse.json(updatedChapter)

    } catch (error) {
        console.log("[Chapters] [PATCH] [UnPublish] error", error)
    }

}