import { NextRequest, NextResponse } from "next/server";
import { authorizeProductDownload } from "@/lib/download-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const result = await authorizeProductDownload(productId);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { sourceUrl, fileName } = result.auth;
  const githubToken = process.env.GITHUB_TOKEN?.trim();

  let upstream: Response;
  try {
    upstream = await fetch(sourceUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "INDUS-Web-Agency-Download-Proxy",
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
      redirect: "follow",
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Download service temporarily unavailable" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Could not fetch product archive" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
