---
# core
title: "What is Category Indexing? The Cross-Sell Math That Beats AI Recommendations"
slug: category-indexing
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: full

# SEO
meta_title: "What is Category Indexing? (Definition for Retail and DTC Operators)"
meta_description: "Category Indexing scores each customer's spend in a category against the file average. The cross-sell technique that reveals gaps and intensities binary purchase flags miss."
sitemapPriority: 0.7

# AEO
tldr: "Category Indexing is a customer-level scoring technique that compares an individual customer's spend in a category against the average customer's spend in the same category, expressed as an index where 100 equals average. A customer indexing at 250 in a category is spending 2.5x the average customer's spend in that category; a customer at 0 has not purchased in it at all. The continuous, relative score reveals cross-sell gaps and category intensities that binary purchase flags cannot see."
key_takeaways:
  - "Category Indexing is continuous, not binary — every customer gets a score for every category."
  - "The score is relative to the file, not to the customer — making it actionable across portfolios."
  - "Gaps between high-index and zero-index categories are the cleanest cross-sell signal available."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [the-six-portfolios, customer-portfolio-management, growth-portfolio, declining-portfolio, settle-price]
related_tool: none
og_image: /images/glossary/category-indexing.png
---

# What is Category Indexing?

## Definition

Category Indexing is a customer-level scoring technique that compares an individual customer's spend in a category against the average customer's spend in the same category, expressed as an index where 100 equals average. A customer indexing at 250 in a category is spending 2.5x the average; a customer at 0 has not purchased in it at all. The continuous, relative score reveals cross-sell gaps that binary purchase flags cannot see.

## How Category Indexing works

The calculation is mechanical. For each customer and each category on the file:

```
Customer Category Index = (Customer Spend in Category / Average Customer Spend in Category) × 100
```

Run the calculation for every customer across every category and the output is a full matrix — every customer gets an index score for every category. A customer who has never bought a category scores 0. A customer who spends exactly the average scores 100. A customer who spends 2x the average scores 200.

Three properties of the score make it operationally useful. **It's continuous, not binary** — most segmentation says "this customer bought from Category A: yes/no." Category Indexing says "this customer indexes at 340 in Category A, 0 in Category B, and 95 in Category C." That continuous resolution is what reveals gaps and intensities at the same time. **It's relative to the file, not to the customer** — a customer who spends $400 on Outerwear looks like a high spender in absolute terms, but the index tells you whether $400 is unusual for your file or just normal Outerwear spend at your AOV. **It produces gap analysis** — once every customer is indexed across every category, the cross-sell opportunity becomes mechanical: find customers indexing high in one category and zero or low in adjacent ones.

## Why Category Indexing matters in 2026

Most "AI-powered recommendation" tooling that has flooded the ecommerce stack since 2023 attempts to solve the cross-sell problem with collaborative filtering or sequence modeling — techniques borrowed from streaming media and search. The techniques work poorly in retail because retail purchase intervals are long and category-shift signals are sparse. Category Indexing is the older, mechanically simpler technique that retailers have used for decades because it produces actionable scores from the data every store already has. In a 2026 environment where AI recommendation costs are rising and accuracy is plateauing, operators are rediscovering that a calculation invented before the cloud existed still beats most of the modern alternatives.

## How Category Indexing differs from category penetration

Category penetration is a file-level metric — what percentage of customers have purchased from a given category. Category Indexing is a customer-level metric — how much each individual customer's spend in a category compares to the file average. Penetration tells you the category is bought by 40% of your file; indexing tells you which 40%, how heavily, and which other 60% are the cross-sell target. Penetration is a top-line summary; indexing is the operational data that supports cross-sell campaigns and assortment decisions.

## How to apply Category Indexing to your store

1. **Calculate the index for every customer across every category** on a rolling 12-month window. Most ecommerce platforms can output the spend-by-customer-by-category data needed; the index calculation itself is a single division.
2. **Find the gap patterns.** Sort customers by their highest-index category, then look at which categories they score 0 or near-0 in. Those are the cross-sell hypotheses with the cleanest signal.
3. **Layer the index over The Six Portfolios.** A Q1 Growth customer indexing high in three categories behaves differently than a Q1 Stable customer indexing high in one. The combination reveals brand champions, category specialists, and defection risks the portfolios alone cannot.

## Related terms

- [Customer Portfolio Management](/glossary/customer-portfolio-management)
- [The Six Portfolios](/glossary/the-six-portfolios)
- [Growth Portfolio](/glossary/growth-portfolio)
- [Declining Portfolio](/glossary/declining-portfolio)
- [Settle Price](/glossary/settle-price)

## FAQ

**Q: What is category indexing in ecommerce?**
A: Category Indexing is a customer-level scoring technique that compares an individual customer's spend in a category to the average customer's spend in the same category, expressed as an index where 100 equals average. The score reveals which categories each customer over-indexes in, under-indexes in, or has not purchased at all — producing the cleanest cross-sell signal available from existing transaction data.

**Q: How do you calculate a customer category index?**
A: Divide the customer's spend in a category by the average customer's spend in that same category, then multiply by 100. A customer who spent $200 in a category where the average customer spent $80 has a category index of 250. A customer who spent zero in the category has an index of 0. The calculation runs across every customer and every category to produce a full indexing matrix.

**Q: How is category indexing different from AI product recommendations?**
A: AI product recommendations typically use collaborative filtering or sequence modeling — techniques that work well for streaming media and search but struggle with the long purchase intervals and sparse category-shift signals of retail. Category Indexing is a mechanically simpler calculation that produces actionable cross-sell scores from existing transaction data. It is older, more reliable, and frequently outperforms the modern alternatives in retail contexts.

## Read next

- **From the Customer Portfolios pillar:** [Customer Portfolio Management: The Six Behavioral States of Every Store](/blog/category/customer-portfolios)
- **Tactical playbook:** [Category Indexing Inside Portfolios: Finding Cross-Sell Opportunities by Behavioral State](/blog/category-indexing-by-portfolio)
- **Related glossary:** [The Six Portfolios](/glossary/the-six-portfolios)

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
