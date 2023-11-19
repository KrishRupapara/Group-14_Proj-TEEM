"use client";
import { mont } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
// import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  summary: z
    .string({
      required_error: "Summary is required",
    })
    .min(1, {
      message: "Summary must be at least 1 character long",
    }),
  status: z
    .string({
      required_error: "Please select a status",
    })
    .default("To do"),
  desc: z.string(),
  assignee: z
    .string({
      required_error: "Please select an assignee",
    })
    .min(1, {
      message: "Assignee must be at least 1 character long",
    }),
});

export default function Task() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      summary: "",
      status: "To do",
      desc: "",
      assignee: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(JSON.stringify(data));
    // toast({
    //   title: "Task created",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 z-10">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  // console.log("Hello"s);

  return (
    <div
      className={cn(
        "w-full h-full bg-[#E5F2FF] flex items-center justify-center",
        mont.className
      )}
    >
      <div className="h-4/5 w-4/5 flex flex-col justify-evenly">
        <h1 className="text-3xl font-bold text-center text-slate-600">
          Create a Task
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-around gap-2"
          >
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="Summary" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="To do" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#E5F2FF]">
                      <SelectItem value="To do" className="cursor-pointer">
                        To do
                      </SelectItem>
                      <SelectItem
                        value="In progress"
                        className="cursor-pointer"
                      >
                        In progress
                      </SelectItem>
                      <SelectItem value="Done" className="cursor-pointer">
                        Done
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is issue&apos;s original status upon creation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description of the task here..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#E5F2FF]">
                      <SelectItem value="To do" className="cursor-pointer">
                        To do
                      </SelectItem>
                      <SelectItem
                        value="In progress"
                        className="cursor-pointer"
                      >
                        In progress
                      </SelectItem>
                      <SelectItem value="Done" className="cursor-pointer">
                        Done
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-900" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#BDC4D8] rounded-[7px] text-lg hover:bg-[#BDC4D8] w-fit px-6 py-2"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
