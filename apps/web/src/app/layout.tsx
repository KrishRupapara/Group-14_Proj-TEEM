import "./globals.css";
import type { Metadata } from "next";

import { mont } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Teem App",
  description: "Experience the power of smart scheduling ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mont.className}>{children}</body>
    </html>
  );
}
