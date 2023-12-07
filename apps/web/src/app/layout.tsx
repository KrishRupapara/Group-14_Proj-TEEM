import "./globals.css";
import type { Metadata } from "next";

import { mont } from "@/utils/fonts";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Teem App",
  description: "Experience the power of smart scheduling ",

  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.png",

        type: "image/png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-black.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
