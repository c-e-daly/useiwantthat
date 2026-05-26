---
# core
title: "What is Attrition Migration Tracking? The CPM Methodology"
slug: attrition-migration-tracking
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: full
robots: "index, follow"

# SEO
meta_title: "What is Attrition Migration Tracking? (AMT Methodology for CPM)"
meta_description: "Attrition Migration Tracking (AMT) is the methodology that produces The Six Portfolios using quintile scoring across rolling 12-month periods. Built 25 years ago for retail."
sitemapPriority: 0.7

# AEO
tldr: "Attrition Migration Tracking (AMT) is the methodology that classifies every customer into one of The Six Portfolios by comparing two rolling 12-month windows of purchase behavior (P1 and P2) and applying quintile scoring within each portfolio. AMT was engineered 25 years ago for retailers managing $1B+ customer files and remains the most operationally useful customer-classification technique available."
key_takeaways:
  - "AMT is the engine that produces The Six Portfolios — it is the methodology, not the framework."
  - "AMT uses three rolling 12-month windows (P1, P2, P3) and quintile scoring within each portfolio."
  - "The directional signal of quintile movement is what makes AMT actionable where RFM is not."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [customer-portfolio-management, the-six-portfolios, growth-portfolio, declining-portfolio]
related_tool: none
og_image: /images/glossary/attrition-migration-tracking.png
---

# What is Attrition Migration Tracking?

## Definition

Attrition Migration Tracking (AMT) is the methodology that classifies every customer into one of The Six Portfolios by comparing two rolling 12-month windows of purchase behavior (P1 and P2) and applying quintile scoring within each portfolio. AMT was engineered 25 years ago for retailers managing $1B+ customer files and remains the most operationally useful customer-classification technique available.

## How Attrition Migration Tracking works

AMT scores customers in two distinct steps.

**Step one — binary classification.** Every customer is checked for purchase activity in three rolling 12-month windows: P1 (months 0–12), P2 (months 13–24), and P3 (months 25–36). The combination of yes/no across the three periods produces the six portfolio buckets: New (P1 only), Reactivated (P1 and P3, no P2), Active (P1 and P2 — which then splits into Growth, Stable, or Declining), and Defected (P2 but no P1).

**Step two — quintile scoring.** Within each portfolio, customers are sorted by P1 net sales and assigned to quintiles (Q1 = top 20%, Q5 = bottom 20%). For Growth, Stable, and Declining portfolios, the customer's P2 quintile is also computed — the *movement* between P2 quintile and P1 quintile is what determines whether the customer is Growth, Stable, or Declining. A customer at Q2 in P2 and Q3 in P1 is Declining. A customer at Q2 in both is Stable. A customer at Q3 in P2 and Q2 in P1 is Growth.

The output is a complete classification for every customer: portfolio plus quintile, refreshed at whatever cadence the operator runs the methodology — daily in Prophet's CPM engine, quarterly at minimum for operators running it manually.

## Why Attrition Migration Tracking matters in 2026

The methodology predates the modern DTC era by two decades, which is precisely why it matters now. Modern customer segmentation tools (RFM, cohort analysis, K-means clustering) emerged from SaaS and were ported to ecommerce without translation. AMT was built for retail customer files specifically — files where customers buy intermittently, where lifetime value develops over years not subscription periods, and where the question "is this customer growing or shrinking" is the operative business question. Operators rediscovering retail-native methodologies are finding that the discipline is more sophisticated than what 2024-era ecommerce tooling provides.

## How Attrition Migration Tracking differs from cohort analysis

Cohort analysis groups customers by entry date and tracks them as a unit through time. AMT classifies customers individually by their current behavioral state regardless of when they entered. A January 2023 customer and a March 2025 customer can both be in Growth Q1 today, and AMT treats them as the same audience because they should receive the same offer. Cohort analysis cannot make that grouping. Cohort analysis answers "how is each entry-month performing?" AMT answers "where is each individual customer right now?"

## How to apply Attrition Migration Tracking to your store

1. **Pull 36 months of transaction data** and tag each customer's activity in P1 (0–12 months), P2 (13–24 months), and P3 (25–36 months).
2. **Run the binary classification first** — produce the six portfolio buckets based on which periods each customer has purchases in.
3. **Then run the quintile scoring** — within each portfolio, sort by P1 net sales and assign Q1 through Q5; for Active customers, also compute the P2 quintile and use the movement to split into Growth, Stable, or Declining.

## Related terms

- [Customer Portfolio Management](/glossary/customer-portfolio-management)
- [The Six Portfolios](/glossary/the-six-portfolios)
- [Growth Portfolio](/glossary/growth-portfolio)
- [Declining Portfolio](/glossary/declining-portfolio)

## FAQ

**Q: What is attrition migration tracking?**
A: Attrition Migration Tracking (AMT) is the methodology that produces The Six Portfolios in Customer Portfolio Management. It classifies every customer into one of six behavioral states by comparing purchase activity across three rolling 12-month windows and applying quintile scoring within each state.

**Q: How often should I run AMT?**
A: Daily if the methodology is built into software (Prophet runs it nightly). Quarterly at minimum for operators running it manually in spreadsheets or BI tools. Monthly is better. Annual is too infrequent — customers move between portfolios faster than annual cadence can track.

**Q: Can AMT work for small Shopify stores?**
A: The binary portfolio classification works at any file size. The quintile scoring requires roughly 1,000+ buyers per portfolio for meaningful resolution. Stores under that threshold can use AMT for the six-state classification and defer quintile scoring until the file grows.

## Read next

- **From the Customer Portfolios pillar:** [Customer Portfolio Management: The Six Behavioral States of Every Store](/blog/category/customer-portfolios)
- **Tactical playbook:** [Quintile Scoring vs RFM: Why Movement Matters More Than State](/blog/quintile-vs-rfm)
- **Run your numbers:** Coming soon — Prophet's CPM engine runs AMT nightly.

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
