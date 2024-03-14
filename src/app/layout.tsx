import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../styles/globals.scss";
import {Providers} from "@/lib/providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const poppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - ContentList",
    default: "ContentList",
  },
  description:
    "Create best to worst rankings easily. Add contents to your list by easily searching and drag into group with similar ranked contents.",
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
        <link rel="manifest" href="/assets/favicons/manifest.json" crossOrigin="use-credentials" />
        <meta
          name="description"
          content="Create best to worst rankings easily. Add contents to your list by easily searching and drag into group with similar ranked contents."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.contentlist.space" />
        <meta property="og:title" content="ContentList" />
        <meta
          property="og:description"
          content="Create best to worst rankings easily. Add contents to your list by easily searching and drag into group with similar ranked contents."
        />
        <meta property="og:image" content="https://www.contentlist.space/assets/app-image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.contentlist.space" />
        <meta property="twitter:title" content="ContentList" />
        <meta
          property="twitter:description"
          content="Create best to worst rankings easily. Add contents to your list by easily searching and drag into group with similar ranked contents."
        />
        <meta
          property="twitter:image"
          content="https://www.contentlist.space/assets/app-image.png"
        />
        <meta name="theme-color" content="#18181b" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "http://schema.org/",
                "@type": "Project",
                name: "ContentList",
                logo: "https://www.contentlist.space/assets/square-logo.png",
                url: "https://www.contentlist.space",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "Türkiye",
                },
              },
              null,
              "\t",
            ),
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "http://schema.org/",
                "@type": "Project",
                name: "ContentList",
                logo: "https://www.contentlist.space/assets/square-logo.png",
                url: "https://www.contentlist.space",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "Türkiye",
                },
              },
              null,
              "\t",
            ),
          }}
        ></script>
      </head>
      <body className={poppinsFont.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
