/**
 * Booking transactional emails via Resend.
 * Falls back to console.log if RESEND_API_KEY is not configured (dev mode).
 */

interface BookingEmailPayload {
  to:               string
  tenantName:       string
  confirmationCode: string
  propertyName:     string
  checkIn:          string  // YYYY-MM-DD
  checkOut:         string  // YYYY-MM-DD
  nights:           number
  totalAmountCents: number
}

function formatUSD(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

function html(p: BookingEmailPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Booking Confirmation</title></head>
<body style="margin:0;padding:0;background:#0A0906;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#cdccca">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto">
    <tr><td style="padding:0 32px">
      <div style="border-bottom:1px solid #262523;padding-bottom:24px;margin-bottom:32px">
        <p style="color:#C9A650;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0">Christian Property Management</p>
        <h1 style="color:#ffffff;font-weight:300;font-size:32px;margin:8px 0 0;font-family:Georgia,serif">Booking Confirmed</h1>
      </div>
      <p style="color:#cdccca;line-height:1.6">Hi ${p.tenantName},</p>
      <p style="color:#cdccca;line-height:1.6">Your reservation has been confirmed. Here are your details:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#1c1b19;border:1px solid #262523;margin:24px 0">
        <tr><td style="padding:20px 24px;border-bottom:1px solid #262523">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#797876">Confirmation Code</p>
          <p style="margin:4px 0 0;font-size:20px;color:#C9A650;letter-spacing:0.05em">${p.confirmationCode}</p>
        </td></tr>
        <tr><td style="padding:20px 24px;border-bottom:1px solid #262523">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#797876">Property</p>
          <p style="margin:4px 0 0;color:#ffffff">${p.propertyName}</p>
        </td></tr>
        <tr><td style="padding:20px 24px;border-bottom:1px solid #262523">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#797876">Dates</p>
          <p style="margin:4px 0 0;color:#ffffff">${p.checkIn} &rarr; ${p.checkOut} &middot; ${p.nights} night${p.nights !== 1 ? 's' : ''}</p>
        </td></tr>
        <tr><td style="padding:20px 24px">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#797876">Total Charged</p>
          <p style="margin:4px 0 0;color:#ffffff;font-size:18px">${formatUSD(p.totalAmountCents)}</p>
        </td></tr>
      </table>
      <p style="color:#797876;font-size:13px;line-height:1.6">Questions? Reply to this email or call <a href="tel:8005550199" style="color:#C9A650">(800) 555-0199</a>.</p>
      <p style="color:#5a5957;font-size:11px;margin-top:40px;border-top:1px solid #262523;padding-top:16px">Licensed &middot; Insured &middot; CalDRE #02XXXXXX<br>Christian Property Management &mdash; Southern California</p>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendBookingConfirmation(p: BookingEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.info('[BookingEmail] RESEND_API_KEY not set — skipping email, would have sent to:', p.to)
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from:    process.env.EMAIL_FROM ?? 'bookings@christianpm.com',
      to:      p.to,
      subject: `Booking Confirmed — ${p.confirmationCode}`,
      html:    html(p),
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('[BookingEmail] Resend error:', res.status, body)
  } else {
    console.info('[BookingEmail] Confirmation sent to:', p.to, p.confirmationCode)
  }
}
