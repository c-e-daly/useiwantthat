---
# core
title: "What are Key Measures? The Core Metrics of Customer Portfolio Management"
slug: key-measures
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: full

# SEO
meta_title: "What are Key Measures? (Core Retail and Ecommerce Metrics)"
meta_description: "Key Measures are the core metrics of Customer Portfolio Management — Gross Sales, NOR Sales, Net Sales, AOV, AUR, UPT, and the related vocabulary that makes portfolio analysis possible."
sitemapPriority: 0.7

# AEO
tldr: "Key Measures are the foundational metrics used in Customer Portfolio Management and ecommerce reporting. They establish a precise vocabulary across three sales layers (Gross, NOR, Net) and three quantity layers (Items, Units, Orders), producing the diagnostic measures — AOV, AUR, UPT, Discount Rate, Return Rate, Cancel Rate — that reveal portfolio health and inform offer strategy."
key_takeaways:
  - "Key Measures are the precise vocabulary that prevents reporting confusion between Gross, NOR, and Net."
  - "Items and Units are not the same thing — and confusing them produces wrong CGO and inventory decisions."
  - "The drilled-down measures (returns, cancellations) reveal the leaks the headline numbers hide."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [gross-sales, nor-sales, net-sales, net-aov, aur, average-settle-price, upt, upi, ipt, net-items, net-units, discount-rate, return-rate, cancel-rate]
related_tool: none
og_image: /images/glossary/key-measures.png
---

# What are Key Measures?

## Definition

Key Measures are the foundational metrics used in Customer Portfolio Management and ecommerce reporting. They establish a precise vocabulary across three sales layers — **Gross, NOR, and Net** — and three quantity layers — **Items, Units, and Orders** — producing the diagnostic measures that reveal portfolio health and inform offer strategy.

## How Key Measures work

Most ecommerce reporting confusion comes from imprecise vocabulary. Shopify reports "net sales" on one screen and "net sales" on another and the numbers disagree because the platform calculates them differently. Operators argue about whether AOV should include discounts or be gross of returns. Key Measures resolves this by defining each term explicitly and then composing the diagnostic measures from those definitions.

**The three sales layers:**

- **Gross Sales** — the sum of item selling prices times units purchased, before any discounts or returns
- **NOR Sales** — Gross Sales less discounts (NOR = Net of Returns is a misnomer historically; in practice it means *net of discounts but before returns*)
- **Net Sales** — NOR Sales less returns and cancellations; the revenue the business actually kept

**The three quantity layers:**

- **Items** — distinct SKUs in an order (a customer buying 3 different products has 3 items)
- **Units** — quantity of each SKU summed across the order (a customer buying 3 of the same product plus 1 of another has 4 units across 2 items)
- **Orders** — transactions, regardless of size

Each quantity has gross, return, cancelled, and net layers. Net Items = Gross Items − Return Items − Cancelled Items. Net Units = Gross Units − Return Units − Cancelled Units.

**The diagnostic measures** are calculated from these primitives: AOV (sales per order), AUR (selling price per unit), Average Settle Price (NOR Sales per item — the realized post-discount price), UPT (units per transaction), UPI (units per item), IPT (items per transaction), Discount Rate, Return Rate, Cancel Rate.

## Why Key Measures matter in 2026

The precision matters more in 2026 than it did in 2020 for three reasons. First, customer-generated offers and negotiated commerce produce per-item Settle Prices that require Items-level reporting, not just Order-level. Second, return rates and cancellation rates have risen meaningfully across DTC and now represent a larger share of the gap between Gross and Net than they did three years ago. Third, agentic commerce introduces transaction patterns that don't fit traditional reporting buckets — agents may purchase per-item rather than per-order, and the Key Measures vocabulary is what lets the analytics keep up.

## How Key Measures differ from typical ecommerce dashboards

A typical ecommerce dashboard shows revenue, orders, and AOV as headline numbers. Key Measures decomposes each headline into its source components so operators can see *where* the leaks are. Revenue that looks healthy in aggregate may hide a rising Return Rate or a worsening Discount Rate. AOV that looks stable may hide a declining IPT (customers buying fewer distinct items) compensated by a rising UPI (more units of fewer items). The dashboard summary is the screen the operator looks at; Key Measures is the vocabulary that lets them ask the right next question.

## How to apply Key Measures to your store

1. **Lock down the definitions in your reporting before you do anything else.** Pick one definition for Net Sales (we recommend Gross − Discounts − Returns − Cancellations) and enforce it across every dashboard, every spreadsheet, and every meeting.
2. **Separate Items from Units in every report.** They are not the same metric. CGO basket strategy, cross-sell campaigns, and inventory decisions all depend on the distinction.
3. **Drill on the leak measures.** Return Rate, Discount Rate, and Cancel Rate together explain most of the gap between Gross and Net. If margin is compressing, one of the three is moving.

## The Key Measures catalog

**Sales layers**

- [Gross Sales](/glossary/gross-sales)
- [NOR Sales](/glossary/nor-sales)
- [Net Sales](/glossary/net-sales)

**Order-level measures**

- [Net AOV](/glossary/net-aov)
- [AUR](/glossary/aur) — Average Unit Retail
- [Average Settle Price](/glossary/average-settle-price)

**Quantity measures**

- [Net Items](/glossary/net-items)
- [Net Units](/glossary/net-units)

**Per-transaction measures**

- [UPT](/glossary/upt) — Units Per Transaction
- [UPI](/glossary/upi) — Units Per Item
- [IPT](/glossary/ipt) — Items Per Transaction

**Leak measures**

- [Discount Rate](/glossary/discount-rate)
- [Return Rate](/glossary/return-rate)
- [Cancel Rate](/glossary/cancel-rate)

## Related terms

- [Customer Portfolio Management](/glossary/customer-portfolio-management)
- [The Six Portfolios](/glossary/the-six-portfolios)
- [Settle Price](/glossary/settle-price)

## FAQ

**Q: What are key measures in retail and ecommerce?**
A: Key Measures are the foundational metrics that establish a precise vocabulary across three sales layers (Gross, NOR, Net) and three quantity layers (Items, Units, Orders). They produce the diagnostic measures — AOV, AUR, UPT, Discount Rate, Return Rate, Cancel Rate — that reveal portfolio health and inform offer strategy.

**Q: What is the difference between Gross Sales, NOR Sales, and Net Sales?**
A: Gross Sales is item selling prices times units, before any adjustments. NOR Sales is Gross Sales less discounts (but before returns and cancellations). Net Sales is NOR Sales less returns and cancellations — the revenue the business actually kept. The three layers exist because each tells a different operational story: Gross shows pricing strategy, NOR shows discount discipline, Net shows what hit the bank account.

**Q: What is the difference between Items and Units in ecommerce reporting?**
A: Items are distinct SKUs in an order; Units are quantity of each SKU summed across the order. A customer buying 3 different products has 3 items. A customer buying 3 of the same product has 1 item and 3 units. The distinction is critical for CGO basket strategy, cross-sell analysis, and inventory planning — a metric like UPT (units per transaction) can stay flat while IPT (items per transaction) collapses, which would be invisible if Items and Units were collapsed.

## Read next

- **From the Customer Portfolios pillar:** [Customer Portfolio Management: The Six Behavioral States of Every Store](/blog/category/customer-portfolios)
- **The blog deep-dive:** [The Metrics You Really Need to Know for Your Shopify Orders](/blog/shopify-metrics-deep-dive)
- **Related glossary:** [Settle Price](/glossary/settle-price)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
