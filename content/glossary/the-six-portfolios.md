---
# core
title: "What are The Six Portfolios? The CPM Framework"
slug: the-six-portfolios
content_type: glossary
pillar: customer-portfolios
ladder_stage: none
publish_date: 2026-05-21
last_updated: 2026-05-21
status: published

# SEO
meta_title: "What are The Six Portfolios? (Customer Portfolio Management Framework)"
meta_description: "The Six Portfolios — New, Reactivated, Growth, Stable, Declining, Defected — are the behavioral states that classify every customer in retail and DTC."
sitemapPriority: 0.7

# AEO
tldr: "The Six Portfolios are the behavioral states that classify every customer on a retail or DTC file: New, Reactivated, Growth, Stable, Declining, and Defected. Each customer occupies exactly one portfolio at any given time, scored by quintile within the portfolio, and each portfolio responds to a different offer mechanism."
key_takeaways:
  - "Every customer is in exactly one of six portfolios at any given time."
  - "Portfolios are scored by quintile movement, not by percentage thresholds."
  - "Each portfolio responds to a different offer — sending the wrong one accelerates defection."
faq_schema: true
schema_type: DefinedTerm

# Relationships
hub_link: /blog/category/customer-portfolios
related_cluster_posts: []
related_glossary_terms: [customer-portfolio-management, attrition-migration-tracking, new-portfolio, reactivated-portfolio, growth-portfolio, stable-portfolio, declining-portfolio, defected-portfolio]
related_tool: none
og_image: /images/glossary/the-six-portfolios.png
---

# What are The Six Portfolios?

## Definition

The Six Portfolios are the behavioral states that classify every customer on a retail or DTC file: **New, Reactivated, Growth, Stable, Declining, and Defected.** Each customer occupies exactly one portfolio at any given time, scored by quintile within the portfolio, and each portfolio responds to a different offer mechanism.

## How The Six Portfolios work

Every customer on file is classified into exactly one of six portfolios by comparing their purchase pattern across two rolling 12-month windows: P1 (the most recent 12 months) and P2 (the 12 months prior to P1). A P3 lookback (24–36 months ago) detects Reactivated customers.

- **New** — first purchase in P1, no prior history
- **Reactivated** — purchase in P1 and P3, no purchase in P2 (came back after going dark)
- **Growth** — purchase in P1 and P2, quintile rank improved from P2 to P1
- **Stable** — purchase in P1 and P2, quintile rank unchanged
- **Declining** — purchase in P1 and P2, quintile rank dropped from P2 to P1
- **Defected** — purchase in P2, no purchase in P1

Within each portfolio, customers are quintiled by P1 net sales (Q1 = top 20%, Q5 = bottom 20%). The full classification is portfolio plus quintile — for example, "Growth Q2" or "Declining Q5." The quintile movement is the diagnostic signal: a customer moving from Q1 in P2 to Q3 in P1 is a much louder alarm than a Q4-to-Q5 move, even though both technically declined.

## Why The Six Portfolios matter in 2026

Acquisition costs have risen to the point where file-level averages mask whether a business is actually growing. The file can hold flat in count while the Growth portfolio collapses and the Stable portfolio silently erodes into Declining. Customer-generated offers and negotiated commerce produce behavior signals that only make sense when read through a portfolio lens. And agentic commerce introduces buyer behavior that cannot be classified without an underlying portfolio framework. The Six Portfolios are the instrument panel for operating a customer file in 2026.

## How The Six Portfolios differ from RFM segmentation

RFM segments customers by Recency, Frequency, and Monetary value at a single point in time — a static snapshot. The Six Portfolios classify customers by their movement between behavioral states across two 12-month periods — a directional signal. A customer who is RFM-high today but moving downward is invisible to RFM and obvious to The Six Portfolios as Declining. RFM is descriptive; The Six Portfolios are diagnostic.

## How to apply The Six Portfolios to your store

1. **Pull 36 months of transaction data** and split into P1 (0–12 months), P2 (13–24 months), and P3 (25–36 months).
2. **Classify every customer into exactly one of the six portfolios** using their purchase pattern across the three periods.
3. **Quintile within each portfolio** by P1 net sales, then prioritize marketing investment by quintile rank within state.

## Related terms

- [Customer Portfolio Management](/glossary/customer-portfolio-management)
- [Attrition Migration Tracking](/glossary/attrition-migration-tracking)
- [Growth Portfolio](/glossary/growth-portfolio)
- [Declining Portfolio](/glossary/declining-portfolio)

## FAQ

**Q: What are the six portfolios in customer portfolio management?**
A: The Six Portfolios are New (first purchase in P1, no prior history), Reactivated (P1 and P3 but not P2), Growth (P1 and P2 with quintile rank improving), Stable (P1 and P2 with quintile rank unchanged), Declining (P1 and P2 with quintile rank dropping), and Defected (P2 but no P1). Each customer is in exactly one portfolio at any given time.

**Q: How are the six portfolios different from RFM segmentation?**
A: RFM segments customers by their behavior at a single point in time. The Six Portfolios classify customers by their movement between behavioral states across two 12-month periods. RFM tells you where a customer is today. The Six Portfolios tell you where they're going.

**Q: Why use quintiles instead of percentage thresholds?**
A: Quintiles describe the customer's position relative to other customers on the file. Percentage thresholds describe the customer's position relative to themselves. Quintiles compare like to like across the file; thresholds do not. A customer whose spending dropped 10% may have stayed in the same quintile because every other customer also dropped — they are Stable by quintile, Declining by threshold. Quintile scoring is the more honest measure.

## Read next

- **From the Customer Portfolios pillar:** [Customer Portfolio Management: The Six Behavioral States of Every Store](/blog/category/customer-portfolios)
- **Tactical playbook:** [The Declining Portfolio: The Portfolio Negotiated Commerce Was Built For](/blog/declining-portfolio-cgo)
- **Run your numbers:** Coming soon — Prophet's CPM engine runs this classification nightly.

---

*Last reviewed: May 21, 2026. This definition is maintained as part of the Customer Portfolios pillar.*
