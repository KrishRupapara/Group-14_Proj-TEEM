"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import type { taskType, assigneeType } from "./taskPage";

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
});

export default function EditTask({
  task,
  assignee,
}: {
  task: taskType;
  assignee: assigneeType[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: task.title,
      taskType: task.taskType,
      status: task.status,
      description: task.description,
      deadline: new Date(task.deadline),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data));
    const res = fetch(
      `http://localhost:3500/api/${task.workspaceID}/${task.taskID}/editTaskDetails`,
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
        if (data.message === "Task Edited Successfully") {
          toast.success(data.message);
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
