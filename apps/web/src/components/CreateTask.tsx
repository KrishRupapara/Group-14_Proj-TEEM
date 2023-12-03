"use client";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { participant } from "@/app/workspace/components/createMeet";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Summary is required",
    })
    .min(1, {
      message: "Summary must be at least 1 character long",
    }),
  taskType: z.string({
    required_error: "Please enter a type",
  }),
  status: z
    .string({
      required_error: "Please select a status",
    })
    .default("To do"),
  description: z.string(),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  Assignees: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to assign the task to alteast one person.",
  }),
});

export default function Task({ wsID }: { wsID: string }) {
  const [data, setData] = useState<Array<participant>>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${wsID}/allpeople`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.People);
      });
  }, [wsID]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      taskType: "",
      status: "To Do",
      description: "",
      deadline: new Date(),
      Assignees: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data));
    const res = fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${wsID}/assignTask`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Task created successfully") {
          toast.success(data.message);
          router.forward();
        } else {
          toast.error(data.message);
        }
      });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5 flex flex-col justify-evenly">
        <h1 className="text-3xl font-bold text-center text-slate-600">
          <Toaster />
          Create a Task
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-around space-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taskType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Type" {...field} />
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
                      <SelectItem value="To Do" className="cursor-pointer">
                        To Do
                      </SelectItem>
                      <SelectItem
                        value="In Progress"
                        className="cursor-pointer"
                      >
                        In Progress
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
              name="description"
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
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Assignees"
              render={() => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-primaryblue text-black hover:bg-blue-100">
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          className="text-lg text-black mr-2"
                        />
                        Assign
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] p-0">
                      {data?.map((item, id) => (
                        <FormField
                          key={id}
                          control={form.control}
                          name="Assignees"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={id}
                                className="flex flex-row items-start space-x-3 space-y-0 my-1 mx-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      item.emailID
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.emailID,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.emailID
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.userName}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#295be75c] rounded-[7px] text-lg hover:bg-blue-200 px-6 py-2"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
