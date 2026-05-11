import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardList,
  LogOut,
  Megaphone,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";

export type PlaybookType =
  | "offers"
  | "counter_offers"
  | "clearance"
  | "programs"
  | "remarketing"
  | "exit_intent";

export type PlaybookBusinessGoal =
  | "ad_conversion"
  | "margin_recovery"
  | "conversion_rate"
  | "retention"
  | "inventory_velocity";

export type PlaybookPrimaryMetric =
  | "cac_per_customer"
  | "accepted_offer_rate"
  | "gross_margin"
  | "conversion_rate"
  | "recovered_revenue"
  | "exit_offer_rate";

export type PlaybookToolType = "calculator" | "audit" | "planner" | "workflow";

export type PlaybookContentImage = {
  alt: string;
  beforeLabel: string;
  beforeTitle: string;
  beforeDetail: string;
  afterLabel: string;
  afterTitle: string;
  afterDetail: string;
};

export type PlaybookDataPoint = {
  label: string;
  description: string;
};

export type PlaybookStep = {
  title: string;
  description: string;
};

export type Playbook = {
  slug: string;
  href: string;
  icon: LucideIcon;
  title: string;
  type: PlaybookType;
  businessGoal: PlaybookBusinessGoal;
  tagline: string;
  description: string;
  primaryMetric: PlaybookPrimaryMetric;
  ctaLabel: string;
  ctaHref: string;
  toolType: PlaybookToolType;
  contentImage: PlaybookContentImage;
  dataCollected: PlaybookDataPoint[];
  workflow: PlaybookStep[];
  outputs: string[];
};

export const playbooks = {
  cac: {
    slug: "cac-playbook",
    href: "/playbooks/cac-playbook",
    icon: MousePointerClick,
    title:
      "Drive CAC Performance with Higher Yields Using Customer Generated Offers",
    type: "offers",
    businessGoal: "ad_conversion",
    tagline: "98% of ad traffic breaks with the wrong offer.",
    description:
      "Your ads use a blanket offer focused on the size of the discount, not the value of the product. Use customer generated offers on ad landing pages to increase yield and decrease CAC per customer.",
    primaryMetric: "cac_per_customer",
    ctaLabel: "Increase customer yield",
    ctaHref: "/tools/cac-calculator",
    toolType: "calculator",
    contentImage: {
      alt: "Product page comparison between an exit discount and a Make A Deal offer.",
      beforeLabel: "Blanket offer",
      beforeTitle: "20% off on exit intent",
      beforeDetail: "Discounts every shopper the same way after intent is already fading.",
      afterLabel: "Customer generated offer",
      afterTitle: "Make A Deal",
      afterDetail: "Captures the price that keeps the paid visitor in motion.",
    },
    dataCollected: [
      {
        label: "Traffic source cost",
        description: "Ad spend, sessions, and acquisition cost by campaign.",
      },
      {
        label: "Offer intent",
        description: "Customer submitted price, product, and offer context.",
      },
      {
        label: "Unit economics",
        description: "COGS, shipping, fees, margin floor, and target profit.",
      },
    ],
    workflow: [
      {
        title: "Route paid traffic to offer-ready pages",
        description:
          "Give campaign visitors a structured way to name the price that would convert.",
      },
      {
        title: "Evaluate offers against floors",
        description:
          "Accept, counter, or decline based on margin rules instead of static coupon logic.",
      },
      {
        title: "Measure yield by customer",
        description:
          "Compare recovered revenue to acquisition cost so CAC is measured after negotiation.",
      },
    ],
    outputs: [
      "CAC per customer",
      "Accepted offer rate",
      "Recovered campaign revenue",
    ],
  },
  clearance: {
    slug: "clearance-playbook",
    href: "/playbooks/clearance-playbook",
    icon: BarChart3,
    title: "Clear Inventory Without Teaching Every Customer to Wait",
    type: "clearance",
    businessGoal: "inventory_velocity",
    tagline: "Clearance works better when the floor is explicit.",
    description:
      "Move aging inventory with controlled customer offers that protect margin floors and avoid broad discounts across healthy products.",
    primaryMetric: "gross_margin",
    ctaLabel: "Build a margin floor",
    ctaHref: "/tools/price-builder",
    toolType: "calculator",
    contentImage: {
      alt: "Clearance comparison between a sitewide markdown and a controlled floor-based offer.",
      beforeLabel: "Markdown",
      beforeTitle: "Storewide clearance",
      beforeDetail: "Cuts price everywhere and trains customers to wait.",
      afterLabel: "Floor-based offer",
      afterTitle: "Controlled clearance",
      afterDetail: "Lets shoppers negotiate only where inventory needs velocity.",
    },
    dataCollected: [
      {
        label: "Inventory pressure",
        description: "Aging stock, seasonal urgency, and sell-through targets.",
      },
      {
        label: "Product economics",
        description: "COGS, fulfillment costs, fees, and minimum acceptable margin.",
      },
      {
        label: "Offer thresholds",
        description: "Acceptance ranges by SKU, collection, or clearance program.",
      },
    ],
    workflow: [
      {
        title: "Segment inventory by urgency",
        description:
          "Separate products that need movement from products that should hold price.",
      },
      {
        title: "Set floor-based offer rules",
        description:
          "Use product economics to define what can be accepted automatically.",
      },
      {
        title: "Tighten after velocity improves",
        description:
          "Reduce aggressiveness as inventory risk falls or margin pressure rises.",
      },
    ],
    outputs: ["Gross margin", "Inventory velocity", "Recovered cash"],
  },
  counterOffer: {
    slug: "counter-offer-playbook",
    href: "/playbooks/counter-offer-playbook",
    icon: RefreshCw,
    title: "Turn Low Offers Into Margin-Safe Counter Offers",
    type: "counter_offers",
    businessGoal: "conversion_rate",
    tagline: "The first offer is rarely the best offer.",
    description:
      "When a shopper names a price below your floor, keep the negotiation alive with an automatic counter that protects the order economics.",
    primaryMetric: "accepted_offer_rate",
    ctaLabel: "Model counter offers",
    ctaHref: "/tools/price-builder",
    toolType: "workflow",
    contentImage: {
      alt: "Counter offer comparison between a rejected offer and an automated margin-safe counter.",
      beforeLabel: "Dead end",
      beforeTitle: "Offer declined",
      beforeDetail: "A shopper below the floor leaves without another path to buy.",
      afterLabel: "Negotiation",
      afterTitle: "Counter offer sent",
      afterDetail: "Vector moves the customer toward a price that works.",
    },
    dataCollected: [
      {
        label: "Customer offer",
        description: "Submitted price, selected product, and shopper context.",
      },
      {
        label: "Counter range",
        description: "Minimum floor, target price, and acceptable concession bands.",
      },
      {
        label: "Response outcome",
        description: "Accepted, rejected, expired, and converted counter offers.",
      },
    ],
    workflow: [
      {
        title: "Score the incoming offer",
        description:
          "Classify whether the offer can be accepted, countered, or declined.",
      },
      {
        title: "Send a margin-safe counter",
        description:
          "Offer a price that keeps the shopper moving without breaking the floor.",
      },
      {
        title: "Learn the gap",
        description:
          "Track how far customers move from their first offer to the accepted price.",
      },
    ],
    outputs: ["Accepted offer rate", "Counter acceptance rate", "Revenue saved"],
  },
  exitIntent: {
    slug: "exit-intent-playbook",
    href: "/playbooks/exit-intent-playbook",
    icon: LogOut,
    title: "Replace Exit Discounts With Purchase Intent",
    type: "exit_intent",
    businessGoal: "conversion_rate",
    tagline: "Do not ask for an email when you can ask for the order.",
    description:
      "Use exit moments to capture what a visitor would actually pay, then evaluate the offer before the session disappears.",
    primaryMetric: "exit_offer_rate",
    ctaLabel: "Capture exit intent",
    ctaHref: "/contact",
    toolType: "workflow",
    contentImage: {
      alt: "Exit intent comparison between an email discount popup and a Make A Deal prompt.",
      beforeLabel: "Email capture",
      beforeTitle: "Save 10% before you go",
      beforeDetail: "Captures a lead and delays the purchase decision.",
      afterLabel: "Purchase intent",
      afterTitle: "Make A Deal before you go",
      afterDetail: "Captures a concrete buying signal while the shopper is present.",
    },
    dataCollected: [
      {
        label: "Exit trigger",
        description: "Exit motion, cart state, product page, and session context.",
      },
      {
        label: "Named price",
        description: "The offer amount that would keep the shopper engaged.",
      },
      {
        label: "Session recovery",
        description: "Offer submission, counter, checkout, or abandonment outcome.",
      },
    ],
    workflow: [
      {
        title: "Detect high-intent exits",
        description:
          "Trigger offers on moments where a discount popup would normally appear.",
      },
      {
        title: "Ask for the buying price",
        description:
          "Let the shopper submit an offer instead of handing out a coupon.",
      },
      {
        title: "Recover or learn",
        description:
          "Convert the session or collect pricing signal for the next program.",
      },
    ],
    outputs: ["Exit offer rate", "Recovered sessions", "Checkout conversion"],
  },
  programs: {
    slug: "programs-playbook",
    href: "/playbooks/programs-playbook",
    icon: ClipboardList,
    title: "Run Offer Programs Around Your Business Calendar",
    type: "programs",
    businessGoal: "margin_recovery",
    tagline: "Offer strategy should change when the business changes.",
    description:
      "Use programs to make Vector more aggressive or more conservative around campaigns, slow periods, launches, and seasonal inventory windows.",
    primaryMetric: "gross_margin",
    ctaLabel: "Plan an offer program",
    ctaHref: "/contact",
    toolType: "planner",
    contentImage: {
      alt: "Offer program comparison between always-on discounting and calendar-based offer rules.",
      beforeLabel: "Static rules",
      beforeTitle: "Same discount every week",
      beforeDetail: "Ignores campaign timing, inventory pressure, and demand cycles.",
      afterLabel: "Program rules",
      afterTitle: "Calendar-aware offers",
      afterDetail: "Adjusts acceptance and counter rules when the business context changes.",
    },
    dataCollected: [
      {
        label: "Program window",
        description: "Start date, end date, campaign context, and target products.",
      },
      {
        label: "Aggressiveness",
        description: "Acceptance floors, counter ranges, and discount boundaries.",
      },
      {
        label: "Program goal",
        description: "Revenue, margin, conversion, or inventory movement target.",
      },
    ],
    workflow: [
      {
        title: "Define the business moment",
        description:
          "Tie offer behavior to launches, ad pushes, seasonal moments, or slow periods.",
      },
      {
        title: "Set temporary rules",
        description:
          "Adjust thresholds for the products and customers included in the program.",
      },
      {
        title: "Review program performance",
        description:
          "Compare revenue, margin, and accepted offers after the window closes.",
      },
    ],
    outputs: ["Program revenue", "Gross margin", "Accepted offers"],
  },
  remarketing: {
    slug: "remarketing-playbook",
    href: "/playbooks/remarketing-playbook",
    icon: Megaphone,
    title: "Remarket With Offers Instead of Paying for the Click Twice",
    type: "remarketing",
    businessGoal: "retention",
    tagline: "Bring shoppers back with a reason that is not another ad tax.",
    description:
      "Use personalized offer invitations to re-engage shoppers who already showed intent without relying only on paid retargeting and blanket coupons.",
    primaryMetric: "recovered_revenue",
    ctaLabel: "Recover more shoppers",
    ctaHref: "/contact",
    toolType: "workflow",
    contentImage: {
      alt: "Remarketing comparison between paid retargeting and a personalized offer invitation.",
      beforeLabel: "Paid retargeting",
      beforeTitle: "Buy the visitor again",
      beforeDetail: "Spend another ad dollar to repeat the same pitch.",
      afterLabel: "Offer invitation",
      afterTitle: "Return with your price",
      afterDetail: "Invite the shopper back into a negotiated path to purchase.",
    },
    dataCollected: [
      {
        label: "Shopper intent",
        description: "Viewed products, cart state, offer history, and timing.",
      },
      {
        label: "Return channel",
        description: "Email, SMS, paid audience, or onsite return path.",
      },
      {
        label: "Recovered value",
        description: "Accepted offers, converted sessions, and revenue after re-entry.",
      },
    ],
    workflow: [
      {
        title: "Identify lapsed intent",
        description:
          "Find shoppers who showed enough intent to justify a personalized return path.",
      },
      {
        title: "Invite an offer",
        description:
          "Prompt them to make a deal instead of sending a generic coupon.",
      },
      {
        title: "Measure recovered revenue",
        description:
          "Attribute conversion to the offer invitation and compare it to ad cost.",
      },
    ],
    outputs: ["Recovered revenue", "Return conversion", "Retargeting savings"],
  },
} satisfies Record<string, Playbook>;

export const playbookList = Object.values(playbooks);
