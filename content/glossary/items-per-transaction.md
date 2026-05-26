---
# core
title: "What is IPT? Items Per Transaction Definition"
slug: ipt
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: published

# SEO
meta_title: "What is IPT (Items Per Transaction)? Definition for Ecommerce"
meta_description: "IPT is Net Items divided by orders — the average number of distinct SKUs per transaction. The breadth measure that informs CGO basket strategy."
sitemapPriority: 0.7

# AEO
tldr: "IPT (Items Per Transaction) is Net Items divided by total orders in the period — the average number of distinct SKUs purchased per transaction. IPT measures basket breadth (how many different products), distinct from UPT which measures basket volume (how many total units). IPT is the metric most directly informed by CGO basket-building strategy."
key_takeaways:
  - "IPT = Net Items / Orders. The breadth measure of basket size."
  - "IPT and UPT move independently — basket can grow in items, in units, or both."
  - "CGOs that drive incremental items into the basket move IPT directly."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, upt, upi, net-items, settle-price]
related_tool: none
og_image: /images/glossary/ipt.png
---

# What is IPT?

## Definition

IPT (Items Per Transaction) is Net Items divided by total orders in the period — the average number of distinct SKUs purchased per transaction. IPT measures basket breadth (how many different products), distinct from UPT which measures basket volume (how many total units). IPT is the metric most directly informed by CGO basket-building strategy.

## How IPT works

The formula:

```
IPT = Net Items / Orders
```

An item is a distinct SKU in an order. A customer buying one shirt, one pair of pants, and one belt has 3 items. A customer buying three of the same shirt has 1 item. The two customers have very different basket compositions even though both have 3 units.

IPT moves when customers add distinct products to their cart, not when they add more quantity of products already in their cart. That distinction is what makes IPT the headline measure of cross-sell program effectiveness. A successful cross-sell campaign should drive IPT up — customers are buying more different products. If the campaign drives UPT up without lifting IPT, the customers are buying more units of the same products, which is volume behavior, not cross-sell behavior.

IPT is also the metric most directly connected to customer-generated offer strategy. CGOs that successfully encourage customers to add another item to their cart move IPT. CGOs that only drive depth (more units of existing items) move UPT and UPI but leave IPT unchanged.

## Why IPT matters in 2026

The most under-measured aspect of basket size in DTC is breadth. Operators routinely track AOV (which conflates pricing and volume) and units per order (which conflates breadth and depth), but rarely track IPT separately. The 2026 environment makes the omission costly. CGO platforms produce per-item negotiation data that only makes sense when the operator can distinguish whether basket growth is coming from new items entering the cart or from existing items multiplying. Cross-sell campaigns can show flat ROI in aggregate while IPT-specific cohorts demonstrate strong response. Operators measuring IPT separately can run experiments and read results that operators tracking only UPT cannot.

## How IPT differs from UPT

UPT counts total units; IPT counts distinct items. A customer with 3 units of one product has UPT 3 and IPT 1. A customer with one unit each of 3 different products has UPT 3 and IPT 3. The two measures answer different questions: UPT asks "how full was the basket?"; IPT asks "how varied was the basket?" Tracking both is the only way to see which kind of basket growth is happening.

## How to apply IPT to your store

1. **Track IPT in every cross-sell program report.** Successful cross-sell should move IPT, not just UPT. If a campaign lifts revenue but doesn't lift IPT, it's a discount campaign, not a cross-sell campaign.
2. **Use IPT as the success metric for CGO basket-building.** When a CGO offer encourages a customer to add another item, IPT moves. That is the most direct measure of CGO basket effectiveness available.
3. **Diagnose by portfolio.** Growth customers with rising IPT are broadening their brand relationship. Growth customers with rising UPT but flat IPT are deepening their commitment to specific SKUs. Both are healthy patterns but signal different retention strategies.

## Related terms

- [Key Measures](/glossary/key-measures)
- [UPT](/glossary/upt)
- [UPI](/glossary/upi)
- [Net Items](/glossary/net-items)
- [Settle Price](/glossary/settle-price)

## FAQ

**Q: How do you calculate IPT in ecommerce?**
A: Divide Net Items (total distinct SKUs retained by customers, after returns and cancellations) by total orders in the period. The result is IPT — the average number of distinct products per transaction.

**Q: What is the difference between IPT and UPT?**
A: IPT counts distinct items per order; UPT counts total units per order. A customer buying 3 different products has IPT 3 and UPT 3. A customer buying 3 of the same product has IPT 1 and UPT 3. The two measures answer different questions: breadth versus volume.

**Q: Why is IPT important for customer-generated offers?**
A: Because CGOs that drive incremental items into the basket move IPT directly. A CGO that encourages a customer to add a different product to their cart lifts IPT; a CGO that only drives quantity of items already in the cart lifts UPT but not IPT. Operators who measure IPT separately can tell which kind of CGO basket impact they're actually getting.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The volume counterpart:** [UPT](/glossary/upt)
- **The depth ratio:** [UPI](/glossary/upi)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
