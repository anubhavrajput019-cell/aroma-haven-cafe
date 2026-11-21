import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { DEFAULTS } from '@/lib/constants';

interface OrderItemPayload {
  product_id: string;
  quantity: number;
  selected_variant?: { name: string; price: number };
  selected_addons?: Array<{ name: string; price: number }>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      order_type,
      table_number,
      delivery_address,
      items,
      coupon_code,
      tip_amount = 0,
      payment_method,
      special_instructions,
    } = body;

    // Validation checks
    if (!customer_name || !customer_phone) {
      return NextResponse.json(
        { success: false, message: 'Customer name and phone number are required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart items cannot be empty.' },
        { status: 400 }
      );
    }

    if (order_type === 'dine_in' && !table_number) {
      return NextResponse.json(
        { success: false, message: 'Please select a table number for Dine-In orders.' },
        { status: 400 }
      );
    }

    if (order_type === 'delivery' && !delivery_address?.street) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid Motihari delivery address.' },
        { status: 400 }
      );
    }

    // Server-side recalculation of prices to prevent tampering
    let calculatedSubtotal = 0;
    const verifiedItems: Array<{
      product_id: string;
      name: string;
      quantity: number;
      unit_price: number;
      addons_price: number;
      total_price: number;
      variant_name?: string;
      addons?: string[];
    }> = [];

    for (const item of items as OrderItemPayload[]) {
      const dbProduct = MOCK_PRODUCTS.find((p) => p.id === item.product_id);
      if (!dbProduct) {
        return NextResponse.json(
          { success: false, message: `Product ${item.product_id} no longer exists.` },
          { status: 400 }
        );
      }

      // Base price
      let unitPrice = dbProduct.base_price;
      let variantName: string | undefined;

      if (item.selected_variant && dbProduct.variants) {
        const foundVariant = dbProduct.variants.find((v) => v.name === item.selected_variant?.name);
        if (foundVariant) {
          unitPrice = dbProduct.base_price + foundVariant.price_adjustment;
          variantName = foundVariant.name;
        }
      }

      // Addons price
      let addonsPrice = 0;
      const addonsNames: string[] = [];
      if (item.selected_addons && dbProduct.add_ons) {
        for (const addon of item.selected_addons) {
          const foundAddon = dbProduct.add_ons.find((a) => a.name === addon.name);
          if (foundAddon) {
            addonsPrice += foundAddon.price;
            addonsNames.push(foundAddon.name);
          }
        }
      }

      const itemTotal = (unitPrice + addonsPrice) * item.quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        product_id: dbProduct.id,
        name: dbProduct.name,
        quantity: item.quantity,
        unit_price: unitPrice,
        addons_price: addonsPrice,
        total_price: itemTotal,
        variant_name: variantName,
        addons: addonsNames,
      });
    }

    // Delivery calculation
    let deliveryFee = 0;
    if (order_type === 'delivery') {
      deliveryFee =
        calculatedSubtotal >= DEFAULTS.freeDeliveryThreshold
          ? 0
          : DEFAULTS.deliveryFee;
    }

    // Coupon discount calculation
    let discountAmount = 0;
    if (coupon_code) {
      const code = coupon_code.toUpperCase();
      if (code === 'HAVEN100' && calculatedSubtotal >= 499) {
        discountAmount = 100;
      } else if (code === 'WELCOME50' && calculatedSubtotal >= 199) {
        discountAmount = 50;
      } else if (code === 'AROMA20' && calculatedSubtotal >= 349) {
        discountAmount = Math.min(Math.round((calculatedSubtotal * 20) / 100), 150);
      }
    }

    const discountedSubtotal = Math.max(0, calculatedSubtotal - discountAmount);
    const gstRate = DEFAULTS.gstRate; // 0.05
    const taxAmount = Math.round(discountedSubtotal * gstRate);
    const validTip = Math.max(0, Number(tip_amount) || 0);
    const grandTotal = discountedSubtotal + deliveryFee + taxAmount + validTip;

    // Loyalty points calculation: 1 pt per ₹10 spent
    const earnedPoints = Math.floor(grandTotal / 10);

    const orderId = `AHC-${Date.now().toString().slice(-6)}`;

    const orderResponse = {
      id: orderId,
      order_number: `#${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name,
      customer_phone,
      customer_email,
      order_type,
      table_number: order_type === 'dine_in' ? table_number : null,
      delivery_address: order_type === 'delivery' ? delivery_address : null,
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      discount_amount: discountAmount,
      delivery_fee: deliveryFee,
      tax_amount: taxAmount,
      tip_amount: validTip,
      grand_total: grandTotal,
      earned_points: earnedPoints,
      payment_method,
      payment_status: payment_method === 'cash' ? 'pending' : 'paid',
      order_status: 'placed',
      special_instructions: special_instructions || '',
      created_at: new Date().toISOString(),
      estimated_time_minutes: order_type === 'dine_in' ? 15 : order_type === 'takeaway' ? 20 : 35,
    };

    return NextResponse.json({
      success: true,
      message: 'Order created successfully!',
      order: orderResponse,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error creating order.' },
      { status: 500 }
    );
  }
}
