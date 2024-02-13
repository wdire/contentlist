import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../styles/globals.scss";
import {Providers} from "@/lib/providers";
import Header from "@/components/layout/header";

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
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-icon-76x76.png" />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/favicons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico" />
        <link rel="manifest" href="/assets/favicons/manifest.json" crossOrigin="use-credentials" />
        <meta name="description" content="Content List Description" />
        <meta name="theme-color" content="#27272a" />
      </head>
      <body className={poppinsFont.variable}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
