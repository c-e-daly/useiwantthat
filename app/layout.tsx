// app/layout.tsx
import { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter, Kaushan_Script } from "next/font/google"; 
import Script from "next/script";
import { MainHeader } from "@/components/public/mainHeader";
import { Footer } from "@/components/public/footer";
import { Toaster } from "react-hot-toast";
import { PostHogProvider } from "@/src/providers/providers";

export const metadata: Metadata = {
  title: "I Want That! | Interactive Product Tour",
  description: "Experience the consumer webapp in real-time.",
};

const DEFAULT_GTM_ID = "GTM-N6FH92M";
const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID;
const rawGoogleTagId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID =
  rawGtmId && /^GTM-[A-Z0-9]+$/i.test(rawGtmId)
    ? rawGtmId
    : DEFAULT_GTM_ID;
const GOOGLE_TAG_ID =
  rawGoogleTagId && /^(G|GT|AW|DC)-[A-Z0-9]+$/i.test(rawGoogleTagId)
    ? rawGoogleTagId
    : undefined;
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? process.env.POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? process.env.POSTHOG_HOST;

const kaushan = Kaushan_Script({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-kaushan",
  display: 'swap' 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' 
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${kaushan.variable} font-sans antialiased selection:bg-brand/20`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>

      {/* Use bg-surface-canvas (pure white) 
        and text-neutral-dark (pure black) for maximum contrast.
      */}
      <body className="bg-surface-canvas text-neutral-dark min-h-screen flex flex-col">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <PostHogProvider apiKey={POSTHOG_KEY} apiHost={POSTHOG_HOST}>
          <SpeedInsights />
        <MainHeader />
  
        <main className="grow">
        
          {children}
          
          <Toaster 
          position="bottom-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
            },
          }} 
        />
        </main>

        <Footer />
        </PostHogProvider>

        {/* Analytics Scripts */}
        {GOOGLE_TAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_TAG_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        <Script
          src="https://app.lemlist.com/api/visitors/tracking?k=yZAROQpoYbl1TRmzTgUTGs8M0J6hLODH5eTGHNLFTFs%3D&t=tea_TLDpdzKt83BzC3Bqo"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
