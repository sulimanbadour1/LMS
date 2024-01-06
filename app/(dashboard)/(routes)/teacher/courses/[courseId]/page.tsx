import { IconBadge } from "@/components/iconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";

import DescriptionForm from "./_components/DescForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PricingForm from "./_components/PricingForm";
import AttachmentForm from "./_components/AttchForm";
import ChaptersForm from "./_components/ChaptersForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.length > 0,
  ];
  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length; // This will return the number of fields that are not null or undefined

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Overview</h1>
          <span className="text-sm text-slate-500">
            Complete All fields: {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div>
          <div className="flex items-center gap-x-4">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-medium">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm
            initialData={{ ...course, description: course.description ?? "" }}
            courseId={course.id}
          />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-4">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl font-medium">Course Chapters</h2>
            </div>
            {/* The Chapters Form will go here */}
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          <div className="flex items-center gap-x-4">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl font-medium">Pricing</h2>
          </div>
          <PricingForm initialData={course} courseId={course.id} />
          <div className="flex items-center gap-x-4">
            <IconBadge icon={File} />
            <h2 className="text-xl font-medium">Resources and attachments</h2>
          </div>
          <AttachmentForm
            initialData={{ ...course, attachments: [] }}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
