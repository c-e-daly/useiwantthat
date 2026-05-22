---
# core
title: "What is UPT? Units Per Transaction Definition"
slug: upt
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: full

# SEO
meta_title: "What is UPT (Units Per Transaction)? Definition for Ecommerce"
meta_description: "UPT is the average number of units per order — Net Units divided by total orders. The unit-volume measure of basket size."
sitemapPriority: 0.7

# AEO
tldr: "UPT (Units Per Transaction) is Net Units divided by total orders in the period — the average unit count per order. It measures the unit-volume side of basket size, distinct from IPT (items per transaction) which measures the distinct-SKU side. UPT moves when customers buy more of the same product; IPT moves when they buy more different products."
key_takeaways:
  - "UPT = Net Units / Orders. The unit-volume measure of basket size."
  - "UPT moves on quantity decisions (3 of the same item); IPT moves on breadth decisions (3 different items)."
  - "Holding UPT constant while IPT collapses signals a cross-sell breakdown."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, ipt, upi, net-units, net-aov]
related_tool: none
og_image: /images/glossary/upt.png
---

# What is UPT?

## Definition

UPT (Units Per Transaction) is Net Units divided by total orders in the period — the average unit count per order. It measures the unit-volume side of basket size, distinct from IPT (items per transaction) which measures the distinct-SKU side.

## How UPT works

The formula:

```
UPT = Net Units / Orders
```

UPT counts every unit in an order. A customer buying 3 of the same product has 3 units. A customer buying 1 of one product and 2 of another has 3 units. Both customers have the same UPT (3) but very different basket compositions — the first bought one item with 3 units, the second bought two items with one and two units respectively. UPT alone cannot tell them apart; the IPT and UPI measures are what reveal the difference.

UPT is the headline unit-volume metric most ecommerce dashboards display, often labeled simply "units per order." It moves when customers buy more (or less) total quantity per order. It does *not* move when customers buy more (or fewer) distinct products at the same total unit count — that signal lives in IPT.

## Why UPT matters in 2026

UPT is a clean signal for volume-pricing strategy and bundle effectiveness. A bundle that drives UPT up without lifting IPT is increasing volume per SKU — useful for inventory clearance and for SKUs where the operator wants to drive depth. A cross-sell campaign that lifts IPT without lifting UPT is increasing assortment breadth — useful for stocking up new categories and for portfolio diversification. In a 2026 environment where CGOs and dynamic pricing are producing more transaction-level variance, UPT and IPT need to be tracked separately to see which type of basket growth is actually happening.

## How UPT differs from IPT

UPT counts units (quantity of each SKU summed). IPT counts items (distinct SKUs). A customer with 3 of the same product has UPT 3, IPT 1. A customer with 3 different products has UPT 3, IPT 3. The two measures together reveal basket composition that UPT alone cannot. Most operator dashboards only show UPT, which hides whether basket changes are coming from depth (more of the same) or breadth (more different) — a critical distinction for CGO basket strategy and cross-sell program design.

## How to apply UPT to your store

1. **Track UPT alongside IPT in every basket-size report.** The pair reveals depth versus breadth, which UPT alone cannot.
2. **Watch UPT during bundle and volume-pricing tests.** A successful bundle should lift UPT meaningfully; if it doesn't, the bundle is converting purchases that would have happened anyway.
3. **Diagnose by portfolio.** UPT typically varies by Six Portfolios state — Growth customers usually have higher UPT than Declining customers. If they don't, the Growth Portfolio may be defined by breadth (IPT) rather than depth (UPT), which is operationally useful to know.

## Related terms

- [Key Measures](/glossary/key-measures)
- [IPT](/glossary/ipt)
- [UPI](/glossary/upi)
- [Net Units](/glossary/net-units)
- [Net AOV](/glossary/net-aov)

## FAQ

**Q: How do you calculate UPT in ecommerce?**
A: Divide Net Units (total units retained by customers, after returns and cancellations) by total orders in the period. The result is UPT — the average unit count per transaction.

**Q: What is the difference between UPT and IPT?**
A: UPT counts units — quantity of each SKU summed. IPT counts items — distinct SKUs. A customer buying 3 of the same product has UPT 3 and IPT 1. A customer buying 3 different products has UPT 3 and IPT 3. The two measures answer different basket-composition questions.

**Q: Should UPT use gross units or net units?**
A: Net units (gross minus returns minus cancellations). UPT is meant to reflect basket size as the business retained it. Using gross units overstates UPT because it counts units the customer ultimately did not keep.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The breadth counterpart:** [IPT](/glossary/ipt)
- **The depth ratio:** [UPI](/glossary/upi)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
