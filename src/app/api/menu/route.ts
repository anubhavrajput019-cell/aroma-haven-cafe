import { NextResponse } from 'next/server';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/mockMenu';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const isSpecial = searchParams.get('special');

  let items = [...MOCK_PRODUCTS];

  if (category && category !== 'all') {
    items = items.filter(
      (item) => item.category_id === category || item.category?.slug === category
    );
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (isSpecial === 'true') {
    items = items.filter((item) => item.is_todays_special);
  }

  return NextResponse.json({
    success: true,
    count: items.length,
    categories: MOCK_CATEGORIES,
    products: items,
  });
}
