import type { Metadata } from "next";
import { mont } from "@/utils/fonts";
import ProjectNav from "../components/ProjectNav";

export const metadata: Metadata = {
  title: "Project page",
  description: "Experience the power of smart scheduling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    // <body className={mont.className}>
    <>
      <ProjectNav />
      {children}
    </>
    // </body>
    // </html>
  );
}
