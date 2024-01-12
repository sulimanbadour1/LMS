import { IconBadge } from "@/components/iconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/ChapterTitle";
import ChapterDescForm from "./_components/ChapterDesc";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  // User must be logged in
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  // Chapter must exist
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  // Chapter must belong to user
  if (!chapter) {
    return redirect("/");
  }
  // Chapter must have mux data
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transtion mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to course
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Setting up your chapter</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-col-2 gap-6 mt-16">
        <div className="space-y-4 ">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-medium">Chapter details</h2>
          </div>
          <ChapterTitleForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
          <ChapterDescForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
