import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import {Providers} from "@/lib/providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Script from "next/script";
import {ToastContainer} from "react-toastify";
import {APP_BASE_URL} from "@/lib/constants";

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
  icons: [
    {
      url: "apple-touch-icon",
      sizes: "180x180",
      href: "/assets/favicons/apple-icon-180x180.png",
    },
    {
      url: "icon",
      sizes: "192x192",
      href: "/assets/favicons/android-icon-192x192.png",
    },
    {
      url: "icon",
      sizes: "32x32",
      href: "/assets/favicons/favicon-32x32.png",
    },
    {
      url: "icon",
      sizes: "96x96",
      href: "/assets/favicons/favicon-96x96.png",
    },
    {
      url: "icon",
      sizes: "16x16",
      href: "/assets/favicons/favicon-16x16.png",
    },
  ],
  applicationName: "ContentList",
  description:
    "Create best to worst rankings easily. Add contents to your list by easily searching and drag into group with similar ranked contents.",
  openGraph: {
    type: "website",
    url: APP_BASE_URL,
    siteName: "ContentList",
    images: "https://www.contentlist.space/assets/app-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "https://www.contentlist.space/assets/app-image.png",
  },
  manifest: "/assets/favicons/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QRTRW4MKWQ"
          strategy="afterInteractive"
        />
        <Script id="script_ga" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date()); 
          
          gtag('config', 'G-QRTRW4MKWQ');
          `}
        </Script>
        <Script id="script_cookie_1" strategy="afterInteractive">
          {`
        var _iub = _iub || [];
        _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"cookiePolicyInOtherWindow":true,"enableFadp":true,"enableLgpd":true,"enableUspr":true,"fadpApplies":true,"floatingPreferencesButtonColor":"#00FF0A00","floatingPreferencesButtonDisplay":"bottom-right","floatingPreferencesButtonZIndex":-100,"lang":"en","perPurposeConsent":true,"siteId":3553985,"usprApplies":true,"whitelabel":false,"cookiePolicyId":93141495, "banner":{ "acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-right","rejectButtonDisplay":true,"showTitle":false }};
        `}
        </Script>
        <Script src="https://cs.iubenda.com/autoblocking/3553985.js" strategy="afterInteractive" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" async />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />

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
          <ToastContainer theme="dark" position="bottom-center" hideProgressBar />
        </Providers>
      </body>
    </html>
  );
}
