---
# core
title: "What is Net Units? The Volume Measure of Customer Retention"
slug: net-units
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: published

# SEO
meta_title: "What is Net Units? (Ecommerce Volume Definition)"
meta_description: "Net Units is gross units less returned and cancelled units — the total quantity customers actually kept across all SKUs. The volume measure of basket retention."
sitemapPriority: 0.7

# AEO
tldr: "Net Units is gross units less returned units and cancelled units — the total quantity of all SKUs that customers actually kept after every reduction. It is the volume counterpart to Net Items and feeds UPT (units per transaction) and UPI (units per item). Units are quantities; multiple units of the same SKU each count toward the total."
key_takeaways:
  - "Net Units = Gross Units − Returned Units − Cancelled Units."
  - "Units count quantity; 3 of one product = 3 units, even though it's 1 item."
  - "Net Units is the denominator for UPT and the numerator for UPI."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, net-items, upt, upi]
related_tool: none
og_image: /images/glossary/net-units.png
---

# What is Net Units?

## Definition

Net Units is gross units less returned units and cancelled units — the total quantity of all SKUs that customers actually kept after every reduction. It is the volume counterpart to Net Items and feeds UPT (units per transaction) and UPI (units per item). Units are quantities; multiple units of the same SKU each count toward the total.

## How Net Units works

The formula:

```
Net Units = Gross Units − Returned Units − Cancelled Units
```

Each component has a specific definition. **Gross Units** is the total unit count across all orders at the time of payment, including multiple units of the same SKU. **Returned Units** is units returned after payment. **Cancelled Units** is units removed from an order by the customer or shop before fulfillment. The difference is the total quantity customers ultimately kept.

The Units vocabulary tracks the volume dimension of the basket. A customer who buys 3 of the same SKU contributes 3 to gross units, regardless of how many distinct items they bought. This is what distinguishes Units from Items — Items measures breadth (how many different products), Units measures depth (how much quantity in total).

Net Units feeds three diagnostic measures. UPT divides Net Units by Orders to produce the unit-volume measure of basket size. UPI divides Net Units by Net Items to produce the depth-of-purchase ratio. And the gap between Gross Units and Net Units feeds the unit-level Return Rate and Cancel Rate calculations.

## Why Net Units matters in 2026

Net Units is the volume baseline for every depth-related strategy in DTC. Bundle program effectiveness, subscription program design, volume-pricing offers, and inventory velocity calculations all depend on Net Units being measured cleanly. In a 2026 environment where consumables-style purchase patterns are expanding into more categories (driven by subscription growth and CGO depth offers), Net Units reporting becomes more strategically important than it was in a posted-price era where most baskets had UPI of 1.0.

## How Net Units differs from Net Items

Net Units counts quantity of each SKU summed; Net Items counts distinct SKUs. A customer buying 3 of one SKU has 3 net units and 1 net item. A customer buying 1 of each of 3 different SKUs has 3 net units and 3 net items. Same total quantity, completely different basket composition. The two measures together reveal basket structure that either alone cannot.

## How to apply Net Units to your store

1. **Track Net Units separately from Net Items.** Most ecommerce platforms surface units more readily than items; the reverse problem of platforms surfacing items without units is rarer but worth checking.
2. **Watch the three component layers.** Returned Units, Cancelled Units, and the resulting Net Units each tell a different operational story. Return Rate at the unit level can differ from Return Rate at the order level, especially in stores where customers commonly return one of multiple units of the same SKU.
3. **Use Net Units as the foundation for bundle and subscription metrics.** A successful bundle should lift Net Units meaningfully; a successful subscription program should drive Net Units up while keeping Net Items stable (customers commit to more of the same product, not more variety).

## Related terms

- [Key Measures](/glossary/key-measures)
- [Net Items](/glossary/net-items)
- [UPT](/glossary/upt)
- [UPI](/glossary/upi)

## FAQ

**Q: How do you calculate Net Units in ecommerce?**
A: Subtract returned units and cancelled units from gross units in the period. The result is the total quantity of all SKUs that customers ultimately kept. The calculation sums quantities — a customer buying 3 of one SKU contributes 3 to gross units.

**Q: What is the difference between Net Units and Net Items?**
A: Net Units counts quantity of every SKU; Net Items counts distinct SKUs. A customer with 3 of one product has 3 net units and 1 net item. A customer with 1 each of 3 different products has 3 net units and 3 net items. Same quantity, different basket composition.

**Q: Should subscription orders count units differently?**
A: Each subscription shipment is its own order with its own gross/net unit counts. The recurrence pattern matters for portfolio classification (subscription customers tend to be Growth or Stable), but the unit math is identical to non-subscription orders. The cleaner subscription-specific measure is UPI — subscriptions characteristically have UPI above 1.0 in consumables categories.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The item counterpart:** [Net Items](/glossary/net-items)
- **The transaction measure:** [UPT](/glossary/upt)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
