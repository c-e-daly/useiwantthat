import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getGlossaryPillarTitle, getGlossaryTermBySlug } from "@/lib/glossary/terms";

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

const LOGO_PATH = path.join(process.cwd(), "public", "vector-icon-square.png");

export const alt = "I Want That! glossary article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const term = await getGlossaryTermBySlug(slug);

  if (!term || term.status === "stub") {
    notFound();
  }

  const pillarTitle = getGlossaryPillarTitle(term.pillar) ?? "Ecommerce Glossary";
  const logoData = await readFile(LOGO_PATH);
  const logoUrl = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              color: "#334155",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <img src={logoUrl} style={{ width: 78, height: 78 }} alt="" />
            <span>I Want That!</span>
          </div>
          <div
            style={{
              border: "2px solid #fed7aa",
              borderRadius: 999,
              color: "#9a3412",
              background: "#fff7ed",
              padding: "14px 24px",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {pillarTitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ color: "#ea580c", fontSize: 28, fontWeight: 800 }}>Glossary Article</div>
          <div
            style={{
              maxWidth: "960px",
              fontSize: term.title.length > 72 ? 58 : 68,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            {term.title}
          </div>
          <div style={{ maxWidth: "910px", color: "#475569", fontSize: 30, lineHeight: 1.35 }}>
            {term.metaDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e2e8f0",
            paddingTop: "28px",
            color: "#475569",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span>useiwantthat.com</span>
          <span>{term.path}</span>
        </div>
      </div>
    ),
    size
  );
}
