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
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
};
