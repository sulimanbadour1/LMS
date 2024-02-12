import { Menu } from "lucide-react";
import { Chapter, UserProgress, Course } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./CourseSidebar";

interface CourseMobileNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };

  progressCount: number;
}

export const CourseMobileNavbar = ({
  course,
  progressCount,
}: CourseMobileNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
