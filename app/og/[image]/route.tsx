import { ImageResponse } from "next/og";
import { getPostDetailBySlug } from "@/lib/blog/posts";

type OgImageRouteContext = {
  params: Promise<{ image: string }>;
};

export const runtime = "nodejs";

function imageNameToSlug(image: string) {
  return decodeURIComponent(image).replace(/\.(png|jpg|jpeg|webp)$/i, "");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET(_request: Request, { params }: OgImageRouteContext) {
  const { image } = await params;
  const slug = imageNameToSlug(image);

  let title = titleFromSlug(slug);
  let description = "Margin-aware acquisition strategy for Shopify brands.";
  let eyebrow = "I Want That";

  try {
    const post = await getPostDetailBySlug(slug);
    title = post.og?.title || post.seoTitle || post.title;
    description = post.og?.description || post.seoDescription || description;
    eyebrow = post.pillarTitle || eyebrow;
  } catch {
    // Keep OG images available even if the post lookup fails during previews.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
          padding: 64,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid #e2e8f0",
            borderRadius: 28,
            background: "#ffffff",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                background: "#f97316",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              I
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>I Want That</div>
              <div style={{ marginTop: 4, fontSize: 18, color: "#64748b" }}>{eyebrow}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
            <div
              style={{
                marginBottom: 24,
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: 999,
                background: "#fff7ed",
                color: "#c2410c",
                padding: "10px 18px",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Shopify growth economics
            </div>
            <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 800, letterSpacing: 0 }}>
              {title}
            </div>
            <div style={{ marginTop: 26, fontSize: 30, lineHeight: 1.35, color: "#475569" }}>
              {description}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#64748b" }}>
            <div>useiwantthat.com</div>
            <div>Customer Generated Offers</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
