import { Category, Course } from "@prisma/client";

type CourseWithProgresswithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgresswithCategory[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard key={item.id} course={item} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-xl text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
