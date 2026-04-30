import type { Database, Json } from "@/src/types/database.types";
import type {
  AeoFields,
  ContentPillar,
  FunnelStage,
  InternalLinks,
  OgFields,
  PostFrontmatter,
  PostTemplate,
  SchemaFields,
  TwitterFields,
  UseCase,
} from "@/lib/blog/prophet-frontmatter.types";

export type BlogPostStatus = "draft" | "scheduled" | "published";

type BlogPostTableRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export type BlogPostRecord = Omit<BlogPostTableRow, "status" | "gtm_layer"> & {
  status: BlogPostStatus;
  gtm_layer: Json | null;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  persona: string | null;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImageUrl: string | null;
  path: string;
  pillar: ContentPillar | null;
  pillarTitle: string | null;
  template: PostTemplate | null;
  readingTimeMinutes: number | null;
  featured: boolean;
  aeoTldr: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string | null;
  markdownPath: string;
  markdown: string;
  html: string;
  gtmLayer: Json | null;
  frontmatter: Partial<PostFrontmatter> | null;
  useCases: UseCase[];
  funnelStage: FunnelStage | null;
  wordCount: number | null;
  authorName: string | null;
  authorRole: string | null;
  og: OgFields | null;
  twitter: TwitterFields | null;
  aeo: AeoFields | null;
  schema: SchemaFields | null;
  internalLinks: InternalLinks | null;
};
