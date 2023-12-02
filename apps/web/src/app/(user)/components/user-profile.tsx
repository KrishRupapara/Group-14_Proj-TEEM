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
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserProfileSchema = z.object({
  UserName: z.string(),
  JobTitle: z.string(),
  Organization: z.string(),
  Country: z.string(),
  Email: z.string(),
});

type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;

export default function UserProfile() {
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState({
    Country: "",
    Email: "",
    UserName: "",
    JobTitle: "",
    Organization: "",
  });

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: data,
    mode: "onChange",
  });

  useEffect(() => {
    fetch(`http://localhost:3500/api/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: UserProfileSchemaType) => {
        setData(data);
        isLoading(false);
        form.reset(data);
      });
  }, []);

  function onSubmit(data: UserProfileSchemaType) {
    fetch(`http://localhost:3500/api/profile`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

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
              name="UserName"
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
              name="JobTitle"
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
              name="Organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Country"
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
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <fieldset disabled>
                      <Input
                        disabled
                        type="text"
                        placeholder="email"
                        {...field}
                      />
                    </fieldset>
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
