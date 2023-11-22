"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserProfileSchema = z.object({
  username: z.string(),
  title: z.string(),
  country: z.string(),
  email: z.string(),
});

type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;

export default function UserProfile() {
  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      username: "John Doe",
      title: "Software Engineer",
      country: "India",
      email: "abc@gmail.com",
    },
    mode: "onChange",
  });

  function onSubmit(data: UserProfileSchemaType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <div className="w-4/5">
          <h1 className="text-xl font-bold">About you</h1>
          <div className=" py-2 px-5 rounded-sm flex flex-col justify-between gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-4/5">
          <h1 className="text-xl font-bold">Contact</h1>
          <div className="py-2 px-5 rounded-sm">
            {/* <h1 className="text-sm font-bold">Email Address</h1>
            <h1 className="text-lg">abc@email.com</h1> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="text-white bg-blue-500 px-10 py-2 rounded-[6px] transition-all hover:bg-blue-800 text-lg mt-5"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
