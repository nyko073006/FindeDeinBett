export type Bed = {
  id: number;
  title: string;
  shop: string;
  price: number;
  currency: string;
  url: string;
  imageUrl: string | null;
  mattressType: string | null;
  firmness: string | null;
  hasHeadboard: boolean;
  hasTopper: boolean;
  topperType: string | null;
  width: number | null;
  length: number | null;
  color: string | null;
  inStock: boolean;
  scrapedAt: string;
};

export const FIRMNESS_OPTIONS = ['H2', 'H3', 'H4'] as const;

export const MATTRESS_TYPES = [
  'Tonnentaschenfederkern',
  '7-Zonen-Taschenfederkern',
  'Bonellfederkern',
  'Kaltschaum',
] as const;
