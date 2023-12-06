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
import { useCookies } from "next-client-cookies";

const UserProfileSchema = z.object({
  UserName: z.string(),
  JobTitle: z.string(),
  Organization: z.string(),
  Country: z.string(),
  Email: z.string(),
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;

export default function UserProfile({
  userData,
}: {
  userData: UserProfileSchemaType;
}) {
  const server = process.env.NEXT_PUBLIC_SERVER;
  const requestCookies = useCookies();

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: userData,
    mode: "onChange",
  });

  function onSubmit(data: any) {
    fetch(`${server}/api/profile`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${requestCookies.get("accessToken")}`,
        cookie: `${requestCookies.get("refreshToken")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
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
