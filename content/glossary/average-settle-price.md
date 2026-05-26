---
# core
title: "What is Average Settle Price? The Post-Discount Realized Price"
slug: average-settle-price
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: published

# SEO
meta_title: "What is Average Settle Price? (Realized Price Definition)"
meta_description: "Average Settle Price is NOR Sales divided by gross items — the post-discount realized price per item across the file. The honest counterpart to AUR."
sitemapPriority: 0.7

# AEO
tldr: "Average Settle Price is NOR Sales divided by gross items sold — the post-discount realized price per item across the file. It is the honest counterpart to AUR, revealing what customers actually paid rather than what the store asked for. The gap between AUR and Average Settle Price is the effective Discount Rate at the item level."
key_takeaways:
  - "Average Settle Price = NOR Sales / gross items. It is the post-discount realized item price."
  - "It is distinct from per-transaction Settle Price, which is the negotiated commerce outcome at the individual offer level."
  - "Together with AUR, it produces the cleanest item-level promotional diagnostic available."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [key-measures, aur, nor-sales, settle-price, discount-rate]
related_tool: none
og_image: /images/glossary/average-settle-price.png
---

# What is Average Settle Price?

## Definition

Average Settle Price is NOR Sales divided by gross items sold — the post-discount realized price per item across the file. It is the honest counterpart to AUR, revealing what customers actually paid rather than what the store asked for. The gap between AUR and Average Settle Price is the effective Discount Rate at the item level.

## How Average Settle Price works

The formula:

```
Average Settle Price = NOR Sales / Gross Items
```

The numerator is NOR Sales — Gross Sales less discounts, before returns and cancellations. The denominator is gross items, not net items. The result is the average price per item across the file *after* the operator's promotional discipline has been applied. A store with $80 AUR and a 20% discount rate will show roughly $64 Average Settle Price.

The metric is a file-wide rollup. It does not reveal the *distribution* of settle prices per SKU — that requires the per-transaction Settle Price data the CGO system produces. Average Settle Price is the headline; per-transaction Settle Price is the distribution underneath it.

## Why Average Settle Price matters in 2026

Most ecommerce reporting shows AUR as the average price metric, which overstates what customers actually pay in a promotional environment. Average Settle Price corrects that — it is the realized price that matches what customers actually paid and what the business actually collected per item before returns. In a 2026 environment where customer-generated offers and dynamic discounting are producing more price variance per transaction than the historical posted-price model, Average Settle Price is the rollup that lets operators see the aggregate impact of every discount, CGO acceptance, and promotional response in one number.

## How Average Settle Price differs from Settle Price

Average Settle Price (this entry) is a file-wide measure — the aggregate post-discount realized price across all items in the period. Settle Price (separate entry) is a per-transaction concept — the specific price at which an individual buyer's offer and the seller's accept-line meet in a negotiated commerce transaction. The two are related but operate at different scopes. Average Settle Price tells you what your file looks like in aggregate; Settle Price tells you what happened in a specific transaction.

## How to apply Average Settle Price to your store

1. **Calculate Average Settle Price alongside AUR in every monthly report.** The pair reveals what posted prices look like versus what realized prices look like.
2. **The gap is your effective Discount Rate at the item level.** If your reported Discount Rate (Discounts / Gross Sales) disagrees with the AUR-to-Average Settle Price gap, dig into why — the math should reconcile.
3. **Use Average Settle Price as the realized-price baseline for CGO accept logic.** When evaluating a customer offer, compare it to the Average Settle Price for that SKU or category, not to AUR. Customers who offer below Average Settle Price are asking for a price the file is not currently producing.

## Related terms

- [Key Measures](/glossary/key-measures)
- [AUR](/glossary/aur)
- [NOR Sales](/glossary/nor-sales)
- [Settle Price](/glossary/settle-price)
- [Discount Rate](/glossary/discount-rate)

## FAQ

**Q: How do you calculate Average Settle Price?**
A: Divide NOR Sales (Gross Sales minus discounts, before returns) by gross items sold in the period. The result is the average realized post-discount price per item across the file.

**Q: How is Average Settle Price different from AUR?**
A: AUR is calculated from Gross Sales — pre-discount. Average Settle Price is calculated from NOR Sales — post-discount. AUR tells you what the store is asking for items; Average Settle Price tells you what customers are actually paying after promotional discipline. The gap between the two is the item-level Discount Rate.

**Q: How is Average Settle Price different from per-transaction Settle Price?**
A: Average Settle Price is a file-wide rollup; per-transaction Settle Price is the individual outcome of a single negotiated commerce transaction. The aggregate is the average of all the individual settles, but the file-wide measure does not reveal the distribution — the per-transaction data does.

## Read next

- **The parent measure:** [Key Measures](/glossary/key-measures)
- **The posted-price counterpart:** [AUR](/glossary/aur)
- **The per-transaction concept:** [Settle Price](/glossary/settle-price)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
