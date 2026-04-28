"use client";

import Link from 'next/link';
import { CheckCircle, Zap, TrendingUp, ArrowRight } from 'lucide-react'; 
import { LogoWordmarkHorizontal } from '@/components/public/LogoWordMark';
import { useRouter } from "next/navigation";


const handleTourClick = () => {
  window.location.href = "https://app.useiwantthat.com/";
};

export default function MarketingHomePage() {

  const router = useRouter();

  return (
      <div className="min-h-screen bg-white">
      {/* 1. Hero: High Contrast & Tight Typography */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 border-b border-surface-border overflow-hidden">
        {/* Subtle Background Pattern (Optional replacement for fibonacci) */}
        <div className="absolute inset-0 bg-cgo-fibonacci opacity-10 pointer-events-none" />
        
        <div className="container relative mx-auto px-4 text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            New: Interactive Shopper Portal
          </div>

          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-bold tracking-tighter text-black leading-[1.1]">
            Customer Generated Offers <br />
            <span className="text-brand">from I Want That!</span>
          </h1>
          
          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-neutral-muted leading-relaxed">
            The best offer any customer gets is the one they create. 
            Activate your audience with a new way to buy and sell.
          </p>
          
          {/* Primary Action Group */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleTourClick}
              className="btn-primary py-4 px-10 text-base w-full sm:w-auto text-center"
            >
              Meet Rami: Take the Tour
            </button>
          </div>

          {/* 2. The "Product Tour" Image Container */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="relative rounded-askrami border border-black/10 shadow-2xl bg-white p-2">
              {/* Browser Chrome Header */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-border bg-surface-subtle/50 rounded-t-[4px]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <div className="ml-4 h-5 w-full max-w-md bg-white rounded border border-surface-border text-[10px] flex items-center px-3 text-neutral-400">
                  app.useiwantthat.com/demo
                </div>
              </div>
              
              {/* This is where your mobile-app-image goes */}
              <div className="aspect-[16/9] bg-surface-subtle flex items-center justify-center overflow-hidden">
                 {/* Replace this div with your <Image /> component of the webapp */}
                 <div className="text-neutral-400 font-medium flex flex-col items-center">
                    <p>[ Your Mobile App Image Placeholder ]</p>
                    <span className="text-xs uppercase tracking-widest mt-2">Interactive Preview</span>
                 </div>
              </div>

              {/*  Floating Tooltip Demo */}
              <div className="absolute -bottom-6 -right-6 md:right-10 md:bottom-20 max-w-[240px] bg-black text-white p-4 rounded-lg shadow-xl animate-bounce-subtle">
                <p className="text-sm font-semibold">Step 1: Create an Offer</p>
                <p className="text-[12px] opacity-80 mt-1">Users slide to set their own price instantly.</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-brand">1/3</span>
                  <button className="text-[10px] font-bold flex items-center gap-1">Next <ArrowRight size={12}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Strip */}
      <div className="py-12 border-b border-surface-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">Trusted by Modern Retailers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-50">
             {/* Add logo images here */}
             <div className="font-bold text-xl text-black">SHOPY</div>
             <div className="font-bold text-xl text-black">RETAIL-PRO</div>
             <div className="font-bold text-xl text-black">MARKET-GEN</div>
          </div>
        </div>
      </div>

      {/* 4. Feature Grid: Cleaner, Less "Boxy" */}
      <section className="py-24 bg-surface-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-askrami bg-brand/10 flex items-center justify-center text-brand mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">For Shoppers: Perfect Deals</h3>
              <p className="text-neutral-muted leading-relaxed">
                You dictate the price. Submit your dream offer to sellers and get exactly what you want, on your terms.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-askrami bg-brand/10 flex items-center justify-center text-brand mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">For Sellers: Activate Customers</h3>
              <p className="text-neutral-muted leading-relaxed">
                Turn browsing shoppers into active buyers. Only accept offers that meet your profit margins.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-askrami bg-brand/10 flex items-center justify-center text-brand mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Data-Driven Retail</h3>
              <p className="text-neutral-muted leading-relaxed">
                Gain instant market intelligence on customer demand and optimal pricing for your inventory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA: Clean White-on-Black */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Ready to revolutionize retail?
          </h2>
          <Link 
            href="[YOUR_SHOPIFY_APP_STORE_LINK]"
            className="btn-primary bg-white text-black hover:bg-neutral-200 py-4 px-12 text-lg inline-block"
          >
            Join the Movement Today
          </Link>
        </div>
      </section>
    </div>
  );
}