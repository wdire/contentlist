import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../styles/globals.scss";
import clsx from "clsx";
import {Providers} from "@/lib/providers";

const poppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ContentList",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={clsx(poppinsFont.variable)}>
        <Providers>
          <main className="min-h-screen h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
