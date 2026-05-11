import type { PostTemplate } from "@/lib/blog/vector-frontmatter.types";

export type ArticleTemplateVisualStyle = "standard" | "data" | "comparison" | "playbook";
export type ArticleTemplateIntroTreatment = "plain" | "lead" | "problem-statement" | "data-lede";
export type ArticleTemplateHeadingStyle = "standard" | "numbered" | "step" | "comparison";
export type ArticleTemplateCtaPosition = "sticky" | "inline" | "end";

export type ArticleTemplateConfig = {
  id: PostTemplate;
  label: string;
  hero: {
    eyebrow: string;
    showTldr: boolean;
    showReadingMeta: boolean;
    visualStyle: ArticleTemplateVisualStyle;
  };
  body: {
    introTreatment: ArticleTemplateIntroTreatment;
    h2Style: ArticleTemplateHeadingStyle;
    supportsSummaryBox: boolean;
    supportsStatCallouts: boolean;
    supportsComparisonTables: boolean;
    supportsStepBlocks: boolean;
  };
  sidebar: {
    enabled: boolean;
    tableOfContents: boolean;
    ctaPosition: ArticleTemplateCtaPosition;
  };
  modules: {
    showKeyTakeaways: boolean;
    showFaq: boolean;
    showRelatedArticles: boolean;
    showUseCaseLinks: boolean;
    showFinalCta: boolean;
  };
  schema: {
    article: true;
    faq: boolean;
    howTo: boolean;
    breadcrumb: true;
  };
};

export const ARTICLE_TEMPLATE_CONFIGS = {
  "problem-fix": {
    id: "problem-fix",
    label: "Problem / Cost / Fix",
    hero: {
      eyebrow: "Problem / Cost / Fix",
      showTldr: true,
      showReadingMeta: true,
      visualStyle: "standard",
    },
    body: {
      introTreatment: "problem-statement",
      h2Style: "standard",
      supportsSummaryBox: true,
      supportsStatCallouts: true,
      supportsComparisonTables: false,
      supportsStepBlocks: false,
    },
    sidebar: {
      enabled: true,
      tableOfContents: true,
      ctaPosition: "sticky",
    },
    modules: {
      showKeyTakeaways: true,
      showFaq: true,
      showRelatedArticles: true,
      showUseCaseLinks: true,
      showFinalCta: true,
    },
    schema: {
      article: true,
      faq: true,
      howTo: false,
      breadcrumb: true,
    },
  },
  listicle: {
    id: "listicle",
    label: "Listicle",
    hero: {
      eyebrow: "Tactics",
      showTldr: true,
      showReadingMeta: true,
      visualStyle: "standard",
    },
    body: {
      introTreatment: "lead",
      h2Style: "numbered",
      supportsSummaryBox: true,
      supportsStatCallouts: true,
      supportsComparisonTables: false,
      supportsStepBlocks: false,
    },
    sidebar: {
      enabled: true,
      tableOfContents: true,
      ctaPosition: "inline",
    },
    modules: {
      showKeyTakeaways: true,
      showFaq: true,
      showRelatedArticles: true,
      showUseCaseLinks: true,
      showFinalCta: true,
    },
    schema: {
      article: true,
      faq: true,
      howTo: false,
      breadcrumb: true,
    },
  },
  "data-story": {
    id: "data-story",
    label: "Data Story",
    hero: {
      eyebrow: "Data story",
      showTldr: true,
      showReadingMeta: true,
      visualStyle: "data",
    },
    body: {
      introTreatment: "data-lede",
      h2Style: "standard",
      supportsSummaryBox: true,
      supportsStatCallouts: true,
      supportsComparisonTables: true,
      supportsStepBlocks: false,
    },
    sidebar: {
      enabled: true,
      tableOfContents: true,
      ctaPosition: "inline",
    },
    modules: {
      showKeyTakeaways: true,
      showFaq: true,
      showRelatedArticles: true,
      showUseCaseLinks: true,
      showFinalCta: true,
    },
    schema: {
      article: true,
      faq: true,
      howTo: false,
      breadcrumb: true,
    },
  },
  playbook: {
    id: "playbook",
    label: "Playbook",
    hero: {
      eyebrow: "Playbook",
      showTldr: true,
      showReadingMeta: true,
      visualStyle: "playbook",
    },
    body: {
      introTreatment: "lead",
      h2Style: "step",
      supportsSummaryBox: true,
      supportsStatCallouts: true,
      supportsComparisonTables: false,
      supportsStepBlocks: true,
    },
    sidebar: {
      enabled: true,
      tableOfContents: true,
      ctaPosition: "sticky",
    },
    modules: {
      showKeyTakeaways: true,
      showFaq: true,
      showRelatedArticles: true,
      showUseCaseLinks: true,
      showFinalCta: true,
    },
    schema: {
      article: true,
      faq: true,
      howTo: true,
      breadcrumb: true,
    },
  },
  versus: {
    id: "versus",
    label: "Versus",
    hero: {
      eyebrow: "Comparison",
      showTldr: true,
      showReadingMeta: true,
      visualStyle: "comparison",
    },
    body: {
      introTreatment: "lead",
      h2Style: "comparison",
      supportsSummaryBox: true,
      supportsStatCallouts: true,
      supportsComparisonTables: true,
      supportsStepBlocks: false,
    },
    sidebar: {
      enabled: true,
      tableOfContents: true,
      ctaPosition: "inline",
    },
    modules: {
      showKeyTakeaways: true,
      showFaq: true,
      showRelatedArticles: true,
      showUseCaseLinks: true,
      showFinalCta: true,
    },
    schema: {
      article: true,
      faq: true,
      howTo: false,
      breadcrumb: true,
    },
  },
} satisfies Record<PostTemplate, ArticleTemplateConfig>;

export function getArticleTemplateConfig(template: PostTemplate | null | undefined): ArticleTemplateConfig {
  return template ? ARTICLE_TEMPLATE_CONFIGS[template] : ARTICLE_TEMPLATE_CONFIGS["problem-fix"];
}
