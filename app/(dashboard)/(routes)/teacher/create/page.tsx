"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { error } from "console";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
});
const CreateCourse = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  // To submit the form, we need to use the `handleSubmit` method from the `form` object.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      toast.success("Course created successfully.");
      router.push(`/teacher/courses/${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
      console.log("Some error occurred", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
      <h1 className="text-2xl">Give your course a name</h1>
      <p className="text-sm text-slate-500">
        This is the first step to creating your course. You can always change
        the name later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Course title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Introduction to React"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  The name of your course as it will appear on your course page
                  and on the course card.
                </FormDescription>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Button variant="destructive" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
