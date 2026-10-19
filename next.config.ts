import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // O terminal usa SharedArrayBuffer (input() bloqueante do Python no worker),
  // que só existe com a página isolada (crossOriginIsolated).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
      {
        source: "/game/andante.py",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ]
  },
}

export default nextConfig
