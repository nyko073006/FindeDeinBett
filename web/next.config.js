/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel/Next bundlen zur Laufzeit gelesene Dateien nicht automatisch.
  // Die SQLite-Datei muss explizit ins API-Route-Bundle, sonst findet
  // Prisma sie im Serverless-Filesystem auf Vercel nicht.
  // Hinweis: in Next 14.x liegt diese Option noch unter `experimental`;
  // Next 15 hat sie ins Top-Level verschoben.
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./prisma/database.sqlite'],
    },
  },
};

module.exports = nextConfig;
