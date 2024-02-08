import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const puclishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: puclishedChapterIds,
        },
        isCompleted: true,
      },
    });
    const progress = (validCompletedChapters / publishedChapters.length) * 100;
    return progress;
  } catch (error) {
    console.log("Error getting progress: ", error);
    return 0;
  }
};
