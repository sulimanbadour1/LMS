import { Category, Course } from "@prisma/client";


import { getProgress } from "./getProgress";
import { db } from "@/lib/db";

type CourseWithProgresswithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
}



export const getCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CourseWithProgresswithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                }, purchases: {
                    where: {
                        userId
                    },
                    orderBy: {
                        createdAt: "desc"
                    },
                }
            }
        });
        const coursesWithProgress: CourseWithProgresswithCategory[] = await Promise.all(courses.map(async (course) => {
            if (course.purchases.length === 0) {
                return {
                    ...course,
                    progress: null
                }
            }
            const progressPercentage = await getProgress(userId, course.id);
            return {
                ...course,
                progress: progressPercentage

            }
        }))

        return coursesWithProgress;

    } catch (error) {
        console.log("Error getting courses in the get courses action: ", error);
        return [];
    }
}