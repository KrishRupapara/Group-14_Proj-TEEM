"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import type { meetType, inviteeType } from "./taskPage";
import toast, { Toaster } from "react-hot-toast";

const meetingFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Summary must be at least 2 characters.",
    })
    .max(30, {
      message: "Summary must not be longer than 30 characters.",
    }),
  description: z.string(),
  agenda: z
    .string()
    .min(2, { message: "Agenda must be at least 2 characters." }),
  startDate: z.date({
    required_error: "Date of meeting is required.",
  }),
  startTime: z.string({
    required_error: "Start time is required.",
  }),
  endTime: z.string({
    required_error: "End time is required.",
  }),
  venue: z.string().min(2, { message: "Venue must be at least 2 characters." }),
});

type MeetingFormValues = z.infer<typeof meetingFormSchema>;

export function EditMeet({
  meet,
  invitees,
}: {
  meet: meetType;
  invitees: inviteeType[];
}) {
  const val = meet.endTime.slice(0, 5);
  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      title: meet.title,
      description: meet.description,
      agenda: meet.agenda,
      venue: meet.venue,
      startTime: "",
      endTime: "",
      startDate: new Date(meet.meetDate),
    },
  });

  function onSubmit(data: z.infer<typeof meetingFormSchema>) {
    console.log(JSON.stringify(data));
    const res = fetch(
      `http://localhost:3500/api/${meet.workspaceID}/${meet.meetID}/editMeetDetails`,
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
        if (data.message === "Meet Edited Successfully") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  }

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;

  console.log(meet.startTime.slice(0, 5));

  const stime = form.watch("startTime");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agenda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agenda</FormLabel>
                <FormControl>
                  <Input placeholder="agenda" {...field} />
                </FormControl>
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
                    placeholder="Enter the description of the meeting here..."
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
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Meeting date</FormLabel>
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

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select the start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px] w-[240px]">
                      {timeOptions.map((t) => {
                        if (
                          form.getValues("startDate") <= new Date() &&
                          t < time
                        )
                          return;

                        return (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select the end time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px] max-w-[240px]">
                      {timeOptions.map((t) => {
                        if (stime && t > stime) {
                          return (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="venue" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#295be75c] rounded-[7px] text-lg hover:bg-[#BDC4D8]  px-6 py-2"
          >
            Create
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}

const timeOptions = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
