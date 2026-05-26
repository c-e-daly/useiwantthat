---
# core
title: "What is UPI? Units Per Item Definition"
slug: upi
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: published

# SEO
meta_title: "What is UPI (Units Per Item)? Definition for Ecommerce"
meta_description: "UPI is Net Units divided by Net Items — the average quantity purchased per distinct SKU. The depth-of-purchase metric that most ecommerce reporting ignores."
sitemapPriority: 0.7

# AEO
tldr: "UPI (Units Per Item) is Net Units divided by Net Items — the average quantity purchased per distinct SKU in an order. UPI of 1.0 means customers buy one of each item they purchase; UPI of 2.0 means they buy two of each. The depth-of-purchase metric reveals volume-buying behavior that UPT alone cannot."
key_takeaways:
  - "UPI = Net Units / Net Items. The depth-of-purchase ratio."
  - "UPI of 1.0 = one unit per item; UPI > 1.0 = customers are stocking up or volume-buying."
  - "UPI is one of the most under-reported metrics in DTC despite being directly actionable for bundle strategy."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, upt, ipt, net-units, net-items]
related_tool: none
og_image: /images/glossary/upi.png
---

# What is UPI?

## Definition

UPI (Units Per Item) is Net Units divided by Net Items — the average quantity purchased per distinct SKU in an order. UPI of 1.0 means customers buy one of each item they purchase; UPI of 2.0 means they buy two of each. The depth-of-purchase metric reveals volume-buying behavior that UPT alone cannot.

## How UPI works

The formula:

```
UPI = Net Units / Net Items
```

UPI is a ratio between the two other quantity measures. It compresses two different shopping behaviors into one number: do customers tend to buy a single unit of each product they purchase, or do they stock up?

A consumables-driven store (supplements, cleaning products, pet food) typically has UPI well above 1.0 — customers buy multiple units of products they consume. An apparel-driven store typically has UPI close to 1.0 — customers rarely buy two of the same shirt. A home goods store has UPI between 1.0 and 1.5 depending on category mix.

UPI rarely appears in standard ecommerce dashboards. It is a derived measure that requires both Items and Units reporting separately, which many platforms do not surface natively. Operators who pull the data manually find that UPI is one of the most diagnostically valuable measures in the Key Measures set — it directly informs bundle strategy, subscription program design, and CGO basket logic.

## Why UPI matters in 2026

UPI is the metric that tells the operator whether customer-generated offers should be structured around adding *items* or adding *units*. A store with UPI of 1.0 should design CGO basket logic around encouraging customers to add different items (drive IPT). A store with UPI of 2.5 should design CGO basket logic around encouraging customers to add more of what they're already buying (drive UPI further up). Most CGO platforms in 2026 do not differentiate between these strategies because they don't measure UPI separately. The operators who do measure it can structure offers and bundles with significantly better basket economics.

## How UPI differs from UPT

UPT (Units Per Transaction) divides units by orders. UPI (Units Per Item) divides units by items. UPT tells you how big the basket is in unit terms; UPI tells you whether the basket is wide (many items, low quantity each) or deep (few items, high quantity each). A store with UPT 4 and UPI 1.0 sells 4 different items per order. A store with UPT 4 and UPI 2.0 sells 2 different items at 2 units each. Same UPT, completely different basket structure.

## How to apply UPI to your store

1. **Calculate UPI by category.** Consumables categories will run high UPI; apparel will run near 1.0. The category mix determines store-level UPI; tracking it by category reveals which categories drive depth versus which drive breadth.
2. **Use UPI to design bundle strategy.** High-UPI categories benefit from volume bundles (5-packs, multi-month supplies); low-UPI categories benefit from variety bundles (capsule wardrobes, sample sets).
3. **Watch UPI by customer portfolio.** Growth customers with rising UPI are deepening their relationship with specific SKUs — they're subscription candidates. Growth customers with rising IPT but stable UPI are broadening their relationship — they're loyalty-program candidates.

## Related terms

- [Key Measures](/glossary/key-measures)
- [UPT](/glossary/upt)
- [IPT](/glossary/ipt)
- [Net Units](/glossary/net-units)
- [Net Items](/glossary/net-items)

## FAQ

**Q: How do you calculate UPI in ecommerce?**
A: Divide Net Units by Net Items in the period. The result is the average quantity purchased per distinct SKU — the depth-of-purchase ratio. UPI of 1.0 means customers buy one of each item; UPI above 1.0 means they buy multiples.

**Q: Why don't most ecommerce dashboards show UPI?**
A: Because UPI requires both Items and Units to be reported separately, which many platforms do not do natively. Most dashboards collapse the two into a single "units per order" metric, which hides the depth-versus-breadth signal that UPI reveals. Operators who calculate UPI manually consistently find it among the most actionable measures in the Key Measures set.

**Q: What is a good UPI for a Shopify store?**
A: It depends entirely on category. Consumables stores commonly run UPI of 1.8–3.0. Apparel stores typically run UPI of 1.0–1.2. Home goods and accessories stores fall between. The right benchmark for your store is your own category mix; meaningful UPI movement within your store is more diagnostically valuable than comparison against category averages.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The transaction-level measure:** [UPT](/glossary/upt)
- **The breadth measure:** [IPT](/glossary/ipt)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
