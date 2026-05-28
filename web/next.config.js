/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel/Next bundlen zur Laufzeit gelesene Dateien nicht automatisch.
  // Die SQLite-Datei muss explizit ins API-Route-Bundle, sonst findet
  // Prisma sie im Serverless-Filesystem auf Vercel nicht.
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/database.sqlite'],
  },
};

module.exports = nextConfig;
