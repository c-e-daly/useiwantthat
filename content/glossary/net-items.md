---
# core
title: "What is Net Items? The Foundational Quantity Measure"
slug: net-items
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: full

# SEO
meta_title: "What is Net Items? (Ecommerce Quantity Definition)"
meta_description: "Net Items is gross items less returned and cancelled items — the distinct SKUs customers actually kept. The foundational quantity measure of the Key Measures framework."
sitemapPriority: 0.7

# AEO
tldr: "Net Items is gross items less returned items and cancelled items — the count of distinct SKUs customers actually kept after every reduction. It is the foundational quantity measure that feeds IPT (items per transaction) and serves as the item-level counterpart to Net Units. Items are distinct SKUs; multiple units of the same SKU count as one item."
key_takeaways:
  - "Net Items = Gross Items − Returned Items − Cancelled Items."
  - "Items count distinct SKUs; a customer buying 3 of one product has 1 item, not 3."
  - "Net Items is the denominator for IPT and the input to Average Settle Price."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, net-units, ipt, upi, average-settle-price]
related_tool: none
og_image: /images/glossary/net-items.png
---

# What is Net Items?

## Definition

Net Items is gross items less returned items and cancelled items — the count of distinct SKUs customers actually kept after every reduction. It is the foundational quantity measure that feeds IPT (items per transaction) and serves as the item-level counterpart to Net Units. Items are distinct SKUs; multiple units of the same SKU count as one item.

## How Net Items works

The formula:

```
Net Items = Gross Items − Returned Items − Cancelled Items
```

Each of the three components has a specific definition. **Gross Items** is the count of distinct SKUs across all orders at the time of payment. **Returned Items** is items returned after payment. **Cancelled Items** is items removed from an order by the customer or shop before fulfillment. The difference is what customers ultimately kept.

The Items vocabulary is distinct from the Units vocabulary throughout. A customer buying 3 of the same SKU has 1 item and 3 units. A customer buying 1 each of 3 different SKUs has 3 items and 3 units. The two metrics track different dimensions of the basket — breadth (items) and volume (units). Both have their own gross, returned, cancelled, and net layers.

Net Items is the denominator in several diagnostic measures. IPT divides Net Items by Orders. Average Settle Price divides NOR Sales by gross items (using gross because the calculation is at the point of sale). UPI divides Net Units by Net Items.

## Why Net Items matters in 2026

Most ecommerce platforms collapse items and units into a single "units" report, which hides the distinction critical to CGO and cross-sell strategy. In 2026, when customer-generated offers produce per-item negotiation data, the Items layer of reporting becomes essential. A CGO that successfully encourages a customer to add another item to the cart lifts IPT — but only if Net Items is being measured separately. Operators using item-blind reporting cannot tell whether basket growth is breadth-driven (more items) or volume-driven (more units), which means they cannot diagnose what their CGO program is actually doing.

## How Net Items differs from Net Units

Net Items counts distinct SKUs that customers kept. Net Units counts total quantity of all SKUs that customers kept. A customer who buys 3 of the same SKU has 1 net item and 3 net units. A customer who buys one of each of 3 different SKUs has 3 net items and 3 net units. The two measures together reveal basket composition that either alone cannot.

## How to apply Net Items to your store

1. **Pull Items and Units as separate reports.** If your platform only reports one of them, your basket diagnostics are incomplete. Use a SQL pull or BI tool to produce both.
2. **Track the three component layers.** Returned Items and Cancelled Items behave differently and reveal different operational problems — returns are a fit/quality signal, cancellations are a purchase-intent signal.
3. **Use Net Items as the denominator for IPT and UPI.** Both metrics are foundational to CGO and cross-sell strategy, and both require Net Items reported separately from Net Units.

## Related terms

- [Key Measures](/glossary/key-measures)
- [Net Units](/glossary/net-units)
- [IPT](/glossary/ipt)
- [UPI](/glossary/upi)
- [Average Settle Price](/glossary/average-settle-price)

## FAQ

**Q: How do you calculate Net Items in ecommerce?**
A: Subtract returned items and cancelled items from gross items in the period. The result is the count of distinct SKUs customers ultimately kept. The calculation runs at the SKU level — a customer buying 3 of one SKU contributes 1 to gross items, not 3.

**Q: What is the difference between Items and Units?**
A: Items are distinct SKUs; Units are quantities of each SKU summed. A customer buying 3 of the same product has 1 item and 3 units. A customer buying 3 different products has 3 items and 3 units. Both measures matter for different operational questions.

**Q: Why aren't Items reported by default in most ecommerce platforms?**
A: Historical convention. Most ecommerce reporting evolved from order-level and unit-level metrics; the items dimension was rarely surfaced until CGO and cross-sell analytics created a need for it. Operators who pull items-level reports manually consistently find it among the most diagnostically valuable Key Measures.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The unit counterpart:** [Net Units](/glossary/net-units)
- **The derived measure:** [IPT](/glossary/ipt)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
