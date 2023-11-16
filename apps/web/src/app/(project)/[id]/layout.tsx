import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProjectNav from "./components/ProjectNav";

const montserrat = Montserrat({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={montserrat.className}>
        <ProjectNav />

        {children}
      </body>
    </html>
  );
}
