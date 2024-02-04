"use client";

import { ModelConfirm } from "@/components/modals/confirmModel";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,

  isPublished,
}: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //for publish and unpublish chapter
  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await fetch(`/api/courses/${courseId}/unpublish`, {
          method: "PATCH",
        });
        toast.success("Course unpublished.");
      } else {
        await fetch(`/api/courses/${courseId}/publish`, {
          method: "PATCH",
        });
        toast.success("Course published.");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  // for delete chapter
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="default"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ModelConfirm onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ModelConfirm>
    </div>
  );
};
