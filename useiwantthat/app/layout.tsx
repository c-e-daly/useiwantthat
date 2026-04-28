// app/layout.tsx
import { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter, Kaushan_Script } from "next/font/google"; 
import Script from "next/script";
import { MainHeader } from "@/components/public/mainHeader";
import { Footer } from "@/components/public/footer";
import { Toaster } from 'react-hot-toast';
import { PostHogProvider } from "@/src/providers/providers";

export const metadata: Metadata = {
  title: "I Want That! | Interactive Product Tour",
  description: "Experience the consumer webapp in real-time.",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
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
      </head>

      {/* Use bg-surface-canvas (pure white) 
        and text-neutral-dark (pure black) for maximum contrast.
      */}
      <body className="bg-surface-canvas text-neutral-dark min-h-screen flex flex-col">
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
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
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
