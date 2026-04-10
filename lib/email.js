import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theoilmerchant.online'

function formatPKR(amount) {
  return 'PKR ' + Number(amount).toLocaleString('en-PK')
}

function itemsTable(items) {
  return items.map(item =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#4A5568;">${item.name} (${item.size})</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#4A5568;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1C2B3A;text-align:right;font-weight:500;">${formatPKR(item.price * item.quantity)}</td>
    </tr>`
  ).join('')
}

// EMAIL 1: Customer confirmation
export async function sendOrderConfirmation(order) {
  const {
    order_number, customer_name, customer_email,
    items, subtotal, delivery_fee, total,
    delivery_address, city, payment_method, created_at,
  } = order

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1C2B3A;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:'Georgia',serif;font-size:22px;font-weight:400;color:#fff;letter-spacing:0.08em;text-transform:uppercase;">the oil merchant</p>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(212,234,245,0.7);letter-spacing:0.15em;text-transform:uppercase;">Pure Oils, Honestly Made</p>
        </td></tr>

        <!-- Order confirmed banner -->
        <tr><td style="background:#7D9B77;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:14px;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">Order Confirmed</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <p style="font-family:'Georgia',serif;font-size:22px;color:#1C2B3A;margin:0 0 8px;">Thank you, ${customer_name.split(' ')[0]}!</p>
          <p style="font-size:14px;color:#6A7F8E;line-height:1.7;margin:0 0 24px;">Your order has been placed successfully. We'll prepare it with care and dispatch it soon.</p>

          <div style="background:#F7F4EF;padding:16px 20px;margin-bottom:28px;border-left:3px solid #2A6496;">
            <p style="margin:0;font-size:12px;color:#6A7F8E;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Order Number</p>
            <p style="margin:0;font-size:24px;font-weight:700;color:#1C2B3A;letter-spacing:0.05em;">#${order_number}</p>
          </div>

          <!-- Items table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr style="background:#F7F4EF;">
              <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:600;color:#6A7F8E;letter-spacing:0.08em;text-transform:uppercase;">Product</th>
              <th style="padding:10px 12px;text-align:center;font-size:11px;font-weight:600;color:#6A7F8E;letter-spacing:0.08em;text-transform:uppercase;">Qty</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;font-weight:600;color:#6A7F8E;letter-spacing:0.08em;text-transform:uppercase;">Price</th>
            </tr>
            ${itemsTable(items)}
          </table>

          <!-- Totals -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-top:1px solid #E5E9EC;">
            <tr>
              <td style="padding:10px 0;font-size:13px;color:#6A7F8E;">Subtotal</td>
              <td style="padding:10px 0;font-size:13px;color:#1C2B3A;text-align:right;">${formatPKR(subtotal)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:13px;color:#6A7F8E;">Delivery Fee</td>
              <td style="padding:10px 0;font-size:13px;color:${delivery_fee === 0 ? '#7D9B77' : '#1C2B3A'};text-align:right;font-weight:500;">${delivery_fee === 0 ? 'Free' : formatPKR(delivery_fee)}</td>
            </tr>
            <tr style="border-top:2px solid #1C2B3A;">
              <td style="padding:14px 0;font-size:16px;font-weight:700;color:#1C2B3A;">Total</td>
              <td style="padding:14px 0;font-size:16px;font-weight:700;color:#1C2B3A;text-align:right;">${formatPKR(total)}</td>
            </tr>
          </table>

          <!-- Delivery info -->
          <div style="background:#EEF5FA;padding:16px 20px;margin-bottom:20px;font-size:13px;color:#2A6496;line-height:1.8;">
            <strong>Delivery Address:</strong><br>
            ${delivery_address}, ${city}, Pakistan<br><br>
            <strong>Payment: Cash on Delivery</strong><br>
            Please keep <strong>${formatPKR(total)}</strong> ready when your order arrives.<br><br>
            <strong>Estimated Delivery:</strong> 3-5 business days across Pakistan
          </div>

          <p style="font-size:13px;color:#6A7F8E;line-height:1.7;margin:0;">
            Questions? Reply to this email or visit <a href="${SITE_URL}" style="color:#2A6496;">${SITE_URL}</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F7F4EF;padding:24px 40px;text-align:center;border-top:1px solid #E5E9EC;">
          <p style="margin:0;font-size:11px;color:#6A7F8E;letter-spacing:0.05em;">THE OIL MERCHANT · PAKISTAN · ${SITE_URL}</p>
          <p style="margin:8px 0 0;font-size:11px;color:#6A7F8E;">Pure hair oils, honestly made</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  return resend.emails.send({
    from: `The Oil Merchant <orders@theoilmerchant.online>`,
    to: customer_email,
    subject: `Order Confirmed #${order_number} — The Oil Merchant`,
    html,
  })
}

// EMAIL 2: Admin notification
export async function sendAdminNotification(order) {
  const {
    order_number, customer_name, customer_email, customer_phone,
    delivery_address, city, items, total, payment_method,
    notes, created_at,
  } = order

  const date = new Date(created_at).toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const itemsList = items.map(item =>
    `${item.name} (${item.size}) × ${item.quantity} = ${formatPKR(item.price * item.quantity)}`
  ).join('\n')

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5;">
  <div style="background:#fff;padding:28px;border-radius:4px;">
    <h2 style="color:#1C2B3A;margin:0 0 4px;">New Order: #${order_number}</h2>
    <p style="color:#6A7F8E;margin:0 0 24px;font-size:13px;">${date} · ${formatPKR(total)}</p>

    <h3 style="color:#1C2B3A;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Customer</h3>
    <p style="margin:0 0 4px;font-size:14px;"><strong>${customer_name}</strong></p>
    <p style="margin:0 0 4px;font-size:14px;color:#2A6496;">${customer_email}</p>
    <p style="margin:0 0 16px;font-size:14px;">${customer_phone}</p>

    <h3 style="color:#1C2B3A;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Delivery Address</h3>
    <p style="margin:0 0 16px;font-size:14px;">${delivery_address}<br>${city}, Pakistan</p>

    <h3 style="color:#1C2B3A;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Items Ordered</h3>
    <pre style="background:#f7f7f7;padding:12px;font-size:13px;white-space:pre-wrap;margin:0 0 16px;">${itemsList}</pre>

    <h3 style="color:#1C2B3A;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Payment</h3>
    <p style="margin:0 0 4px;font-size:14px;">Method: <strong>${payment_method}</strong></p>
    <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#1C2B3A;">${formatPKR(total)}</p>

    ${notes ? `<h3 style="color:#1C2B3A;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Order Notes</h3><p style="margin:0 0 16px;font-size:14px;background:#fffbea;padding:10px;">${notes}</p>` : ''}
  </div>
</body>
</html>`

  return resend.emails.send({
    from: `The Oil Merchant <orders@theoilmerchant.online>`,
    to: ADMIN_EMAIL,
    subject: `New Order #${order_number} — ${formatPKR(total)}`,
    html,
  })
}

// EMAIL 3: Shipped notification to customer
export async function sendShippedEmail(order) {
  const { order_number, customer_email, customer_name } = order

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin:0;padding:0;background:#f7f4ef;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">
        <tr><td style="background:#1C2B3A;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:'Georgia',serif;font-size:22px;color:#fff;letter-spacing:0.08em;text-transform:uppercase;">the oil merchant</p>
        </td></tr>
        <tr><td style="background:#2A6496;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:14px;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">Your Order Has Been Shipped!</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-family:'Georgia',serif;font-size:20px;color:#1C2B3A;margin:0 0 16px;">On its way, ${customer_name.split(' ')[0]}!</p>
          <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 20px;">
            Your order <strong>#${order_number}</strong> has been shipped and is on its way to you.<br>
            Estimated arrival: <strong>1-3 business days.</strong>
          </p>
          <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 28px;">
            Thank you for choosing The Oil Merchant — pure oils, honestly made, delivered with care.
          </p>
          <a href="${SITE_URL}" style="display:inline-block;background:#1C2B3A;color:#fff;padding:14px 28px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;">Shop More Oils</a>
        </td></tr>
        <tr><td style="background:#F7F4EF;padding:20px 40px;text-align:center;border-top:1px solid #E5E9EC;">
          <p style="margin:0;font-size:11px;color:#6A7F8E;">${SITE_URL}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return resend.emails.send({
    from: `The Oil Merchant <orders@theoilmerchant.online>`,
    to: customer_email,
    subject: `Your Order #${order_number} Has Been Shipped!`,
    html,
  })
}
