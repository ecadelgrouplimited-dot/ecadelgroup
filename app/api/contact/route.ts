import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Inquiry routing ──────────────────────────────────────────────────────────
const ROUTING: Record<string, string> = {
  services:    "ecadel@ecadelgroup.com",
  partnership: "ecadel@ecadelgroup.com",
  government:  "ecadel@ecadelgroup.com",
  investment:  "ecadel@ecadelgroup.com",
  media:       "ecadel@ecadelgroup.com",
  research:    "ecadel@ecadelgroup.com",
  other:       "ecadel@ecadelgroup.com",
};

const LABELS: Record<string, string> = {
  services:    "Services Inquiry",
  partnership: "Partnership Inquiry",
  government:  "Government / Civic",
  investment:  "Investment Inquiry",
  media:       "Media & Press",
  research:    "Research Collaboration",
  other:       "General Inquiry",
};

// ── Transporter ──────────────────────────────────────────────────────────────
function getTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Auto-reply template ───────────────────────────────────────────────────────
function autoReplyHTML(name: string, type: string, message: string): string {
  const label = LABELS[type] ?? "General Inquiry";
  const excerpt = message.length > 220 ? message.slice(0, 220) + "…" : message;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>ECADEL GROUP — Message Received</title>
</head>
<body style="margin:0;padding:0;background:#060608;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060608;padding:48px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr>
    <td style="background:#0A0C12;border-top:3px solid #C8A96E;padding:28px 40px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <span style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-weight:800;font-size:16px;letter-spacing:0.28em;color:#F0EDE6;text-transform:uppercase;">
              ECADEL <span style="color:#C8A96E;">GROUP</span>
            </span>
            <br/>
            <span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;color:#5A5650;text-transform:uppercase;">Digital Infrastructure &amp; Systems</span>
          </td>
          <td align="right" valign="top">
            <span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.15em;color:rgba(200,169,110,0.7);border:1px solid rgba(200,169,110,0.25);padding:5px 12px;text-transform:uppercase;">Kampala, Uganda</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="background:#0A0C12;padding:48px 40px;">

      <p style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#C8A96E;text-transform:uppercase;margin:0 0 20px 0;">— Message Received</p>

      <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:300;color:#F0EDE6;margin:0 0 6px 0;line-height:1.15;">
        Thank you,<br/><strong style="font-weight:700;">${name}.</strong>
      </h1>
      <p style="font-family:Georgia,serif;font-size:16px;font-style:italic;color:#9A9590;margin:0 0 36px 0;line-height:1.6;">
        Your ${label.toLowerCase()} has been received. We will respond within 48 hours.
      </p>

      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 36px 0;" />

      <!-- Summary card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,169,110,0.04);border:1px solid rgba(200,169,110,0.14);margin-bottom:36px;">
        <tr>
          <td style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.22em;color:#5A5650;text-transform:uppercase;display:block;margin-bottom:5px;">Inquiry Type</span>
            <span style="font-family:'Helvetica Neue',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.1em;color:#C8A96E;text-transform:uppercase;">${label}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 24px;">
            <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.22em;color:#5A5650;text-transform:uppercase;display:block;margin-bottom:10px;">Your Message</span>
            <span style="font-family:Georgia,serif;font-size:14px;color:#9A9590;line-height:1.8;">${excerpt}</span>
          </td>
        </tr>
      </table>

      <p style="font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#9A9590;margin:0 0 16px 0;">
        Our team reads every inquiry personally. We will respond with something worth your time — not a template, not a sales pitch.
      </p>
      <p style="font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#9A9590;margin:0 0 40px 0;">
        Explore our work in the meantime: <a href="https://ecadelgroup.com" style="color:#C8A96E;text-decoration:none;">ecadelgroup.com</a>
      </p>

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:44px;">
        <tr>
          <td style="background:#C8A96E;">
            <a href="https://ecadelgroup.com" style="display:inline-block;padding:14px 36px;font-family:'Helvetica Neue',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#060608;text-decoration:none;text-transform:uppercase;">
              Visit ecadelgroup.com
            </a>
          </td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 36px 0;" />

      <!-- Contact row -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:24px;vertical-align:top;">
            <p style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.22em;color:#5A5650;text-transform:uppercase;margin:0 0 6px 0;">General Inquiries</p>
            <a href="mailto:ecadel@ecadelgroup.com" style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#C8A96E;text-decoration:none;">ecadel@ecadelgroup.com</a>
          </td>
          <td style="padding-right:24px;vertical-align:top;">
            <p style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.22em;color:#5A5650;text-transform:uppercase;margin:0 0 6px 0;">Website</p>
            <a href="https://ecadelgroup.com" style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#C8A96E;text-decoration:none;">ecadelgroup.com</a>
          </td>
          <td style="vertical-align:top;">
            <p style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.22em;color:#5A5650;text-transform:uppercase;margin:0 0 6px 0;">Location</p>
            <span style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#9A9590;">Kampala, Uganda</span>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#060608;border-top:1px solid rgba(255,255,255,0.06);padding:20px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.14em;color:#3A3830;text-transform:uppercase;">
              © 2026 ECADEL GROUP LIMITED · Kampala, Uganda · All Rights Reserved
            </span>
          </td>
          <td align="right">
            <a href="https://ecadelgroup.com" style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.12em;color:rgba(200,169,110,0.5);text-decoration:none;text-transform:uppercase;">ecadelgroup.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Team notification template ────────────────────────────────────────────────
function notificationHTML(data: {
  name: string; org: string; email: string; type: string; message: string;
}): string {
  const label = LABELS[data.type] ?? "General Inquiry";
  const rows = [
    ["Name",          data.name],
    ["Organisation",  data.org],
    ["Email",         data.email],
    ["Inquiry Type",  label],
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Inquiry — ECADEL Website</title>
</head>
<body style="margin:0;padding:0;background:#0A0C12;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0C12;padding:32px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr>
    <td style="background:#141928;border-top:3px solid #C8A96E;padding:20px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.3em;color:#C8A96E;text-transform:uppercase;">ECADEL GROUP · New Inquiry · ecadelgroup.com</span>
    </td>
  </tr>

  <tr>
    <td style="background:#0D1220;padding:36px 32px;">

      <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:#F0EDE6;margin:0 0 4px 0;">${data.name}</h2>
      <p style="font-family:Georgia,serif;font-size:14px;font-style:italic;color:#C8A96E;margin:0 0 28px 0;">${label} · ${data.org}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
        ${rows.map(([k, v]) => `
        <tr>
          <td style="padding:12px 18px;width:36%;background:#0A0C12;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#5A5650;text-transform:uppercase;">${k}</span>
          </td>
          <td style="padding:12px 18px;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#E8E4DC;">${v}</span>
          </td>
        </tr>`).join("")}
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,169,110,0.04);border-left:3px solid #C8A96E;margin-bottom:28px;">
        <tr>
          <td style="padding:20px 24px;">
            <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#5A5650;text-transform:uppercase;display:block;margin-bottom:12px;">Message</span>
            <span style="font-family:Georgia,serif;font-size:14px;color:#9A9590;line-height:1.8;">${data.message}</span>
          </td>
        </tr>
      </table>

      <p style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5A5650;margin:0;">
        Hit <strong style="color:#9A9590;">Reply</strong> to respond directly to
        <a href="mailto:${data.email}" style="color:#C8A96E;text-decoration:none;">${data.email}</a>
      </p>
    </td>
  </tr>

  <tr>
    <td style="background:#060608;border-top:1px solid rgba(255,255,255,0.05);padding:14px 32px;">
      <span style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.12em;color:#3A3830;">
        Sent via ecadelgroup.com/contact · ${new Date().toUTCString()}
      </span>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { name, org, email, type, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials not configured");
      return NextResponse.json({ error: "Mail service unavailable" }, { status: 503 });
    }

    const transporter = getTransporter();
    const from       = `"ECADEL GROUP LIMITED" <${process.env.SMTP_USER}>`;
    const toTeam     = ROUTING[type] ?? "ecadel@ecadelgroup.com";
    const typeLabel  = LABELS[type] ?? "General Inquiry";

    await Promise.all([
      // 1. Branded auto-reply to the person who submitted
      transporter.sendMail({
        from,
        to:      email,
        subject: `We received your message — ECADEL GROUP LIMITED`,
        html:    autoReplyHTML(name, type, message),
      }),
      // 2. Notification to the relevant team inbox — reply-to goes back to sender
      transporter.sendMail({
        from,
        to:      toTeam,
        replyTo: email,
        subject: `[${typeLabel}] ${name} from ${org || "—"} — ecadelgroup.com`,
        html:    notificationHTML({ name, org: org || "—", email, type, message }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
