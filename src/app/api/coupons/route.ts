import { NextResponse } from 'next/server';

const ACTIVE_COUPONS: Record<
  string,
  {
    code: string;
    discount_type: 'flat' | 'percentage';
    discount_value: number;
    min_order_value: number;
    description: string;
  }
> = {
  HAVEN100: {
    code: 'HAVEN100',
    discount_type: 'flat',
    discount_value: 100,
    min_order_value: 499,
    description: '₹100 off on orders above ₹499',
  },
  WELCOME50: {
    code: 'WELCOME50',
    discount_type: 'flat',
    discount_value: 50,
    min_order_value: 199,
    description: '₹50 off for first-time orders above ₹199',
  },
  AROMA20: {
    code: 'AROMA20',
    discount_type: 'percentage',
    discount_value: 20,
    min_order_value: 349,
    description: '20% off up to ₹150 on orders above ₹349',
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Coupon code is required.' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = ACTIVE_COUPONS[cleanCode];

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code.' },
        { status: 404 }
      );
    }

    const currentSubtotal = Number(subtotal) || 0;
    if (currentSubtotal < coupon.min_order_value) {
      return NextResponse.json(
        {
          success: false,
          message: `This coupon requires a minimum order value of ₹${coupon.min_order_value}.`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'flat') {
      discountAmount = coupon.discount_value;
    } else {
      discountAmount = Math.min(Math.round((currentSubtotal * coupon.discount_value) / 100), 150);
    }

    return NextResponse.json({
      success: true,
      message: 'Coupon applied successfully!',
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_amount: discountAmount,
        description: coupon.description,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error validating coupon.' },
      { status: 500 }
    );
  }
}
