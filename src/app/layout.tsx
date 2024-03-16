import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import {Providers} from "@/lib/providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Script from "next/script";
import {ToastContainer} from "react-toastify";

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
          <ToastContainer theme="dark" position="bottom-center" hideProgressBar />
        </Providers>
      </body>
    </html>
  );
}
