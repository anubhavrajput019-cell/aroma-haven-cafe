/**
 * Aroma Haven Café — Branded Email HTML Generator
 * Cinematic, responsive, table-based transactional emails.
 */

interface EmailOrderData {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  order_type: string;
  grand_total: number;
  tax_amount: number;
  delivery_fee: number;
  tip_amount: number;
  items: Array<{ name: string; quantity: number; total_price: number; variant_name?: string }>;
  table_number?: string | null;
  delivery_address?: { street?: string; landmark?: string } | null;
}

export function renderOrderConfirmationEmail(order: EmailOrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #2A2421; color: #F5EBE1; font-size: 14px;">
        ${item.name} ${item.variant_name ? `<span style="color: #D4A373;">(${item.variant_name})</span>` : ''} × ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #2A2421; color: #D4A373; font-weight: bold; text-align: right; font-size: 14px;">
        ₹${item.total_price}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Aroma Haven Café Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #12100E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #F5EBE1;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #12100E; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #1A1614; border: 1px solid #D4A373; border-radius: 16px; overflow: hidden; padding: 32px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 24px; border-bottom: 1px solid #2A2421;">
              <h1 style="color: #D4A373; margin: 0; font-size: 26px; font-family: 'Playfair Display', Georgia, serif; letter-spacing: 1px;">AROMA HAVEN CAFÉ</h1>
              <p style="color: #A89F91; font-size: 12px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 2px;">Served With Love & Quality !!</p>
              <p style="color: #78716C; font-size: 11px; margin: 4px 0 0;">Motihari, Bihar • +91 9229310610</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 24px 0 16px;">
              <h2 style="color: #F5EBE1; margin: 0 0 8px; font-size: 18px;">Thank You, ${order.customer_name}!</h2>
              <p style="color: #A89F91; margin: 0; font-size: 14px; line-height: 1.6;">
                Your order <strong style="color: #D4A373;">${order.order_number}</strong> (${order.id}) has been received and sent to our kitchen team.
              </p>
            </td>
          </tr>

          <!-- Mode Details -->
          <tr>
            <td style="background-color: #211B17; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px; font-size: 13px; color: #A89F91;">
                <strong>Order Type:</strong> <span style="text-transform: capitalize; color: #F5EBE1;">${order.order_type.replace('_', ' ')}</span>
              </p>
              ${
                order.table_number
                  ? `<p style="margin: 0; font-size: 13px; color: #A89F91;"><strong>Table:</strong> ${order.table_number}</p>`
                  : ''
              }
              ${
                order.delivery_address
                  ? `<p style="margin: 0; font-size: 13px; color: #A89F91;"><strong>Delivery To:</strong> ${order.delivery_address.street || 'Motihari'}</p>`
                  : ''
              }
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 24px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th align="left" style="color: #78716C; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Item</th>
                    <th align="right" style="color: #78716C; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Summary Breakdown -->
          <tr>
            <td style="border-top: 1px solid #2A2421; padding-top: 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="color: #A89F91; font-size: 13px; padding: 4px 0;">Tax (GST 5%):</td>
                  <td align="right" style="color: #F5EBE1; font-size: 13px; padding: 4px 0;">₹${order.tax_amount}</td>
                </tr>
                ${
                  order.delivery_fee > 0
                    ? `<tr>
                        <td style="color: #A89F91; font-size: 13px; padding: 4px 0;">Delivery Fee:</td>
                        <td align="right" style="color: #F5EBE1; font-size: 13px; padding: 4px 0;">₹${order.delivery_fee}</td>
                      </tr>`
                    : ''
                }
                ${
                  order.tip_amount > 0
                    ? `<tr>
                        <td style="color: #A89F91; font-size: 13px; padding: 4px 0;">Barista Tip:</td>
                        <td align="right" style="color: #F5EBE1; font-size: 13px; padding: 4px 0;">₹${order.tip_amount}</td>
                      </tr>`
                    : ''
                }
                <tr>
                  <td style="color: #D4A373; font-size: 16px; font-weight: bold; padding: 12px 0 0;">Total Paid:</td>
                  <td align="right" style="color: #D4A373; font-size: 18px; font-weight: bold; padding: 12px 0 0;">₹${order.grand_total}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; border-top: 1px solid #2A2421; margin-top: 24px; color: #78716C; font-size: 11px;">
              <p style="margin: 0 0 6px;">Questions? Call us 24x7 at +91 9229310610 or email Anubhavrajput@aromahavencafe.com</p>
              <p style="margin: 0;">© ${new Date().getFullYear()} Aroma Haven Café. Motihari, Bihar. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
