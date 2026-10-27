import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = (searchParams.get("title") || "INDUS Web Agency").slice(0, 100);
  const subtitle = (searchParams.get("subtitle") || "AI dialers · Custom CRMs · Islamabad").slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0c2340 0%, #0e3a5c 45%, #0891b2 100%)",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#22d3ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0c2340",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            I
          </div>
          <div style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 600 }}>INDUS Web Agency</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "white",
              fontSize: title.length > 48 ? 48 : 56,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ color: "#a5f3fc", fontSize: 26, lineHeight: 1.35, maxWidth: 920 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", color: "#94a3b8", fontSize: 22 }}>induswebagency.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
