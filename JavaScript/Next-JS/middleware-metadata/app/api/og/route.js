import { ImageResponse } from "next/og";
export const runtime = "edge";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Chai or code";
  const description =
    searchParams.get("description") || "Next.js OG Image Generation";
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
        fontSize: 48,
        fontWeight: "bold",
      }}
    >
      <h1>{title}</h1>
      <p
        style={{
          fontSize: 24,
          fontWeight: "normal",
        }}
      >
        {description}
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
