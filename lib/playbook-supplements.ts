export type SupplementCard = {
  title: string;
  eyebrow?: string;
  body?: string;
  tone?: "neutral" | "brand" | "warning";
  items?: string[];
};

export type SupplementTable = {
  columns: string[];
  rows: string[][];
};

export type PlaybookSupplementSection = {
  eyebrow?: string;
  title: string;
  body?: string;
  cards?: SupplementCard[];
  table?: SupplementTable;
  checklist?: string[];
};

export type PlaybookSupplement = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PlaybookSupplementSection[];
};

export const playbookSupplements: Record<string, PlaybookSupplement> = {
  "cac-playbook": {
    eyebrow: "CAC performance playbook",
    title: "98% of ad traffic breaks with the wrong offer",
    intro:
      "Customer generated offers on ad landing pages increase yield and decrease CAC per customer without changing what you spend.",
    sections: [
      {
        title: "The two levers of CAC",
        body:
          "Vector cannot change what you pay per click. It changes how many of those clicks become customers by replacing blanket discounts with intent capture and price discovery.",
        cards: [
          { eyebrow: "Total ad spend", title: "$10,000" },
          { eyebrow: "New customers", title: "100" },
          { eyebrow: "CAC", title: "$100", tone: "brand" },
        ],
      },
      {
        title: "Blanket discount vs. customer generated offer",
        body:
          "Same ad spend, same traffic, different offer logic. A visitor who names a price is already signaling purchase intent.",
        table: {
          columns: ["Metric", "Blanket 20% off", "Customer generated offer"],
          rows: [
            ["Ad spend", "$10,000", "$10,000"],
            ["Sessions from ads", "5,000", "5,000"],
            ["Conversion rate", "2.0%", "2.8%"],
            ["New customers", "100", "140"],
            ["Average discount", "20%", "14.3%"],
            ["CAC per customer", "$100", "$71"],
          ],
        },
      },
      {
        title: "Ad traffic signal detection",
        body:
          "Vector reads the parameters major ad platforms already append to landing page URLs, plus standard UTM fields for manually tagged campaigns.",
        cards: [
          {
            eyebrow: "Google Ads",
            title: "?gclid=",
            body: "Auto-tagged on paid clicks when Google Ads auto-tagging is enabled.",
          },
          {
            eyebrow: "Meta / Instagram",
            title: "?fbclid=",
            body: "Appended to outbound ad clicks, with UTMs available as a fallback.",
          },
          {
            eyebrow: "TikTok",
            title: "?ttclid=",
            body: "Appended to TikTok ad click URLs for attribution and optimization.",
          },
        ],
      },
      {
        title: "Traffic intent tiers",
        body:
          "Not all ad traffic should see the same offer posture. Tighten floors for visitors already close to buying and widen floors when discovery is the conversion goal.",
        table: {
          columns: ["Traffic source", "Intent signal", "Offer posture"],
          rows: [
            ["Google branded search", "Named your brand", "Tight floor (+5-8%)"],
            ["Google product search", "Category comparison", "Moderate floor (+10-12%)"],
            ["Meta retargeting", "Visited but did not buy", "Wider floor (+12-15%)"],
            ["Meta prospecting", "Cold audience", "Widest floor (+15-18%)"],
            ["TikTok", "Impulse discovery", "Wide floor (+15-20%)"],
          ],
        },
      },
      {
        title: "Before you launch",
        checklist: [
          "Set margin floors in Price Builder for every category in the campaign.",
          "Confirm Google Ads auto-tagging is enabled so gclid is appended to clicks.",
          "Create Programs that map at least to paid and organic traffic sources.",
          "Differentiate ad visitor offer copy from standard exit-intent copy.",
          "Configure counter offers so below-floor offers have a recovery path.",
          "Track revenue per visitor alongside CAC.",
        ],
      },
      {
        title: "What breaks and how to avoid it",
        cards: [
          {
            eyebrow: "Failure mode",
            title: "No margin floor set",
            body: "Include COGS, shipping, platform fees, and shrink before any campaign goes live.",
            tone: "warning",
          },
          {
            eyebrow: "Failure mode",
            title: "Same copy for all traffic",
            body: "Differentiate by source so cold visitors and branded search visitors are not treated identically.",
            tone: "warning",
          },
          {
            eyebrow: "Failure mode",
            title: "No counter configured",
            body: "A below-floor offer needs a counter path or the paid visitor simply leaves.",
            tone: "warning",
          },
          {
            eyebrow: "Failure mode",
            title: "Measuring CAC too early",
            body: "Track the offer-yield step so you can see whether negotiation improves conversion efficiency.",
            tone: "warning",
          },
        ],
      },
      {
        title: "What to measure",
        cards: [
          { eyebrow: "Primary metric", title: "CAC per customer", body: "Ad spend divided by customers acquired through accepted offers." },
          { eyebrow: "Supporting metric", title: "Revenue per visitor", body: "Fully within your control and not dependent on auction pricing." },
          { eyebrow: "Offer health", title: "Accepted offer rate", body: "Below 30% can signal that the floor is too tight." },
        ],
      },
    ],
  },
  "clearance-playbook": {
    eyebrow: "Clearance playbook",
    title: "Stop leaving money on the table",
    intro:
      "Move discontinued inventory to a clearance category, leave the selling price intact, and let customers make an offer while you control the floor.",
    sections: [
      {
        title: "The problem with storewide clearance sales",
        body:
          "Broad markdowns discount items that could have sold at full price, teach repeat customers to wait, and signal that your listed prices were never real.",
        table: {
          columns: ["Approach", "Selling price", "Customer discount", "Gross profit"],
          rows: [
            ["40% markdown", "$45.00", "40%", "$7.00"],
            ["Customer generated offer", "$52.50", "30%", "$24.50"],
          ],
        },
      },
      {
        title: "The offer threshold system",
        body:
          "Set the rules once and let Vector route each offer into one of three decision zones.",
        cards: [
          { eyebrow: "Auto accept", title: "0-30% off", body: "Offer stays inside the safe margin floor.", tone: "brand" },
          { eyebrow: "Counter zone", title: "30-50% off", body: "Offer is not dead, but it needs a margin-safe counter." },
          { eyebrow: "Decline", title: "50%+ off", body: "Offer is below your true economics and should not move forward.", tone: "warning" },
        ],
      },
      {
        title: "How Price Builder shields profit markup",
        body:
          "Price Builder makes COGS, shipping, fees, profit markup, and market-adjust buffers explicit so an accepted discount does not accidentally consume core margin.",
      },
      {
        title: "Counter offer mechanics",
        body:
          "Clearance counters should move the shopper from a single-unit, deep-discount mindset toward higher transaction value.",
        cards: [
          { title: "Quantity incentive", body: "Trade a better unit price for more units cleared." },
          { title: "Bundle logic", body: "Recommend companion items that raise AOV while improving inventory velocity." },
        ],
      },
      {
        title: "Markdown vs. CGO revenue comparison",
        body:
          "At a $90 ASP and $38 cost basis, a 24.7% average accepted CGO discount nearly doubles gross profit compared with a 40% blanket markdown across 500 units.",
        table: {
          columns: ["Metric", "Blanket markdown", "Customer generated offer"],
          rows: [
            ["Units cleared", "500", "500"],
            ["Average selling price", "$54.00", "$67.77"],
            ["Gross profit per unit", "$16.00", "$29.77"],
            ["Total gross profit", "$8,000", "$14,885"],
          ],
        },
      },
      {
        title: "Before you launch",
        checklist: [
          "Create a clearance collection that excludes healthy products.",
          "Set product-level cost stacks in Price Builder.",
          "Define auto-accept, counter, and decline bands before traffic starts.",
          "Write counter copy that explains quantity or bundle logic.",
          "Review velocity and floor performance at least weekly.",
        ],
      },
      {
        title: "What breaks and how to avoid it",
        cards: [
          { eyebrow: "Failure mode", title: "Clearance applied too broadly", body: "Limit programs to inventory that actually needs movement.", tone: "warning" },
          { eyebrow: "Failure mode", title: "Floor ignores fulfillment", body: "Include shipping, fees, and handling before accepting offers.", tone: "warning" },
          { eyebrow: "Failure mode", title: "No bundle path", body: "Single-unit counters miss the chance to increase AOV while clearing stock.", tone: "warning" },
        ],
      },
      {
        title: "What to measure",
        cards: [
          { eyebrow: "Primary metric", title: "Gross margin" },
          { eyebrow: "Inventory health", title: "Sell-through velocity" },
          { eyebrow: "Cash recovery", title: "Recovered margin dollars" },
        ],
      },
    ],
  },
  "exit-intent-playbook": {
    eyebrow: "Exit intent playbook",
    title: "Do not ask for an email. Ask for the order.",
    intro:
      "Exit moments are more valuable when they capture a live buying price instead of turning a current purchase decision into a future email problem.",
    sections: [
      {
        title: "Email capture vs. offer capture",
        body:
          "The email capture path defers the purchase. The offer capture path resolves the buying session while the visitor is still present.",
        table: {
          columns: ["Step", "Email capture", "Offer capture"],
          rows: [
            ["Exit prompt", "Save 10% for email", "Make an offer now"],
            ["Signal collected", "Email address", "Product-specific price intent"],
            ["Next action", "Future campaign", "Instant accept, counter, or decline"],
            ["Primary risk", "Coupon collectors", "Below-floor offers"],
          ],
        },
      },
      {
        title: "Why the funnel is different",
        body:
          "Email recovery requires multiple later conversions before a purchase. Offer capture asks one question at the moment of intent.",
        cards: [
          { title: "Email funnel", body: "Visitor gives email, opens message, clicks back, then decides whether to buy." },
          { title: "Offer funnel", body: "Visitor names a price and Vector evaluates the order economics instantly.", tone: "brand" },
        ],
      },
      {
        title: "What you actually learn",
        body:
          "Every exit offer is a price signal tied to a product, session, and customer. Even declined offers can reveal whether the market thinks a product is priced too high.",
      },
      {
        title: "The bounce rate argument",
        body:
          "Generic exit popups are easy to dismiss and often fill lists with noise. Offer capture is self-filtering because only visitors with price intent engage.",
      },
      {
        title: "Every offer has one of three outcomes",
        cards: [
          { title: "Accepted", body: "The order can move directly toward checkout.", tone: "brand" },
          { title: "Countered", body: "The visitor stays in negotiation instead of bouncing." },
          { title: "Declined", body: "The signal still informs pricing and merchandising.", tone: "warning" },
        ],
      },
      {
        title: "Before you launch",
        checklist: [
          "Trigger only on high-intent exits, not every casual bounce.",
          "Set product floors before enabling instant decisions.",
          "Use modal copy that asks for the order, not an email.",
          "Configure counter offers for near-miss prices.",
          "Track accepted, countered, declined, and checkout outcomes separately.",
        ],
      },
      {
        title: "What breaks and how to avoid it",
        cards: [
          { eyebrow: "Failure mode", title: "Too many triggers", body: "Over-triggering trains visitors to ignore the prompt.", tone: "warning" },
          { eyebrow: "Failure mode", title: "Coupon language", body: "A make-a-deal prompt should not look like another generic discount popup.", tone: "warning" },
          { eyebrow: "Failure mode", title: "No outcome split", body: "Accepted and declined offers teach different lessons; measure them separately.", tone: "warning" },
        ],
      },
      {
        title: "What to measure",
        cards: [
          { eyebrow: "Primary metric", title: "Exit offer rate" },
          { eyebrow: "Recovery metric", title: "Recovered sessions" },
          { eyebrow: "Commerce metric", title: "Checkout conversion" },
        ],
      },
    ],
  },
  "programs-playbook": {
    eyebrow: "Programs playbook",
    title: "Your offer strategy should change when your business does",
    intro:
      "Programs let Vector change offer behavior by campaign, season, customer segment, inventory window, or growth goal.",
    sections: [
      {
        title: "What a program is",
        body:
          "A program is a time-bounded set of offer rules scoped to a specific business context. It tells Vector how aggressive or conservative to be, for which customers, on which products, and during which period.",
      },
      {
        title: "Basic vs. advanced",
        body:
          "Programs work on every plan. What changes as you grow is how many can run at once and how finely they can be segmented.",
        table: {
          columns: ["Capability", "Basic", "Advanced"],
          rows: [
            ["Active programs", "One at a time", "Concurrent programs"],
            ["Best use", "Seasonal calendar", "Overlapping customer and campaign logic"],
            ["Rule scope", "Broad windows", "Segment, product, source, and goal"],
          ],
        },
      },
      {
        title: "Annual program calendar",
        body:
          "A planned calendar changes thresholds as business pressure changes. BFCM can tolerate wider floors because volume can compensate for individual margin; fall launches should stay tight to preserve full-price integrity.",
        table: {
          columns: ["Window", "Business pressure", "Offer posture"],
          rows: [
            ["Q1 slow period", "Demand softness", "Moderate floor"],
            ["Mother's Day", "Gift campaign", "Campaign-specific floor"],
            ["BFCM", "High-volume demand", "Wider floor"],
            ["Fall launch", "New product", "Tightest floor"],
          ],
        },
      },
      {
        title: "Concurrent programs",
        body:
          "The same week can run a gift campaign for ad traffic, acquisition rules for new customers, loyalty logic for returning customers, and inventory rules for clearance.",
      },
      {
        title: "Align thresholds to growth goals",
        cards: [
          { title: "Growth", body: "Widen floors when acquisition and conversion volume matter most." },
          { title: "Margin recovery", body: "Tighten floors and lean on counters when profitability matters most." },
          { title: "Inventory velocity", body: "Use product-scoped programs to move specific stock without discounting the whole store." },
        ],
      },
      {
        title: "Before you launch",
        checklist: [
          "Name the business moment and the goal before changing thresholds.",
          "Define included products, customer segments, channels, and dates.",
          "Set start and end dates so temporary rules do not become permanent.",
          "Decide which program wins when multiple rules could apply.",
          "Review performance after the window closes.",
        ],
      },
      {
        title: "What breaks and how to avoid it",
        cards: [
          { eyebrow: "Failure mode", title: "Autopilot rules", body: "Static rules ignore campaign timing, seasonal demand, and inventory pressure.", tone: "warning" },
          { eyebrow: "Failure mode", title: "No expiration", body: "Temporary aggression becomes permanent margin leakage.", tone: "warning" },
          { eyebrow: "Failure mode", title: "Conflicting scopes", body: "Define precedence so each visitor gets the program that matches their context.", tone: "warning" },
        ],
      },
      {
        title: "What to measure",
        cards: [
          { eyebrow: "Program metric", title: "Program revenue" },
          { eyebrow: "Profit metric", title: "Gross margin" },
          { eyebrow: "Behavior metric", title: "Accepted offers" },
        ],
      },
    ],
  },
  "remarketing-playbook": {
    eyebrow: "Remarketing playbook",
    title: "Stop guessing what gets them back",
    intro:
      "Give abandoners an offer invitation with a token, let them name their price, and recover the order without buying the same visitor again.",
    sections: [
      {
        title: "The uncomfortable truth about cart abandonment",
        body:
          "Most carts are abandoned, and not every reason is recoverable. Some shoppers are intentionally waiting for the next discount. Vector separates price intent from ordinary abandonment.",
      },
      {
        title: "Standard recovery vs. Vector recovery",
        body:
          "Traditional recovery sends escalating discounts without a price signal. Vector gives the shopper a way to say what would bring them back.",
        table: {
          columns: ["Moment", "Standard sequence", "Vector approach"],
          rows: [
            ["First message", "Reminder email", "Offer invitation"],
            ["Discount logic", "Merchant guesses", "Customer names price"],
            ["Context", "Cart reminder", "Cart plus offer token"],
            ["Result", "Another campaign", "Offer decision path"],
          ],
        },
      },
      {
        title: "Four cart segments",
        body:
          "Vector tags abandoned carts by state. The accepted-offer-without-checkout segment is uniquely valuable because you know the price was not the issue.",
        cards: [
          { title: "Viewed product, no cart", body: "Invite a first offer." },
          { title: "Carted, no offer", body: "Offer a path back into negotiation." },
          { title: "Offered, no acceptance", body: "Use a stronger counter or clearer value." },
          { title: "Accepted, no checkout", body: "Recover the exact agreed price.", tone: "brand" },
        ],
      },
      {
        title: "How the token link works",
        body:
          "A Vector remarketing token links the returning visitor back to the specific cart, product, and offer context. The token can be dropped into Shopify Flows so existing abandonment emails can open directly into an offer path.",
      },
      {
        title: "Vector remarketing vs. paid retargeting",
        table: {
          columns: ["Metric", "Paid retargeting", "Vector remarketing"],
          rows: [
            ["Cost", "Buy the visitor again", "Use owned recovery channels"],
            ["Message", "Repeat the pitch", "Invite a named price"],
            ["Signal", "Click intent", "Purchase price intent"],
            ["Decision", "Shopper browses again", "Accept, counter, or decline"],
          ],
        },
      },
      {
        title: "Before you launch",
        checklist: [
          "Create tokenized links for abandonment events.",
          "Segment carts by product view, cart state, offer state, and checkout state.",
          "Place the offer invitation where it fits the existing recovery flow.",
          "Use accepted-offer abandoners as the highest-priority segment.",
          "Compare recovered revenue against avoided retargeting spend.",
        ],
      },
      {
        title: "What breaks and how to avoid it",
        cards: [
          { eyebrow: "Failure mode", title: "Generic discount ladders", body: "Escalating coupons train shoppers to wait and still do not reveal the needed price.", tone: "warning" },
          { eyebrow: "Failure mode", title: "Lost cart context", body: "Use tokens so the returning shopper does not rebuild the session.", tone: "warning" },
          { eyebrow: "Failure mode", title: "Treating all abandoners alike", body: "A shopper with an accepted offer needs a different recovery message than a casual browser.", tone: "warning" },
        ],
      },
      {
        title: "What to measure",
        cards: [
          { eyebrow: "Primary metric", title: "Recovered revenue" },
          { eyebrow: "Return metric", title: "Return conversion" },
          { eyebrow: "Efficiency metric", title: "Retargeting savings" },
        ],
      },
    ],
  },
};
