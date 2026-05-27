import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const where: Prisma.BedWhereInput = {};

  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const firmness = parseList(params.get('firmness'));
  if (firmness.length) where.firmness = { in: firmness };

  const mattressType = parseList(params.get('mattressType'));
  if (mattressType.length) where.mattressType = { in: mattressType };

  const topperType = parseList(params.get('topperType'));
  if (topperType.length) where.topperType = { in: topperType };

  const hasHeadboard = params.get('hasHeadboard');
  if (hasHeadboard === 'true') where.hasHeadboard = true;
  if (hasHeadboard === 'false') where.hasHeadboard = false;

  const query = params.get('q');
  if (query) where.title = { contains: query };

  if (params.get('inStock') === 'true') where.inStock = true;

  const sort = params.get('sort') ?? 'price_asc';
  let orderBy: Prisma.BedOrderByWithRelationInput = { price: 'asc' };
  if (sort === 'price_desc') orderBy = { price: 'desc' };
  else if (sort === 'newest') orderBy = { scrapedAt: 'desc' };

  try {
    const beds = await prisma.bed.findMany({ where, orderBy });
    return NextResponse.json({ count: beds.length, beds });
  } catch (error) {
    console.error('GET /api/beds failed:', error);
    return NextResponse.json(
      { error: 'Datenbank nicht erreichbar. Wurde `prisma db push` und der Scraper ausgefuehrt?' },
      { status: 500 },
    );
  }
}
