import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../styles/globals.scss";
import clsx from "clsx";

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
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased", poppinsFont.variable)}
      >
        <main className="min-h-screen h-full">{children}</main>
      </body>
    </html>
  );
}
