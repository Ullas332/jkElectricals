import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({ name, email, phone, service, message, isSuspicious = false, recaptchaScore = null }) => {
  const serviceLabel = service || "Not specified";
  const messageText = message || "No additional details provided.";
  const ownerEmail = process.env.OWNER_EMAIL;

  // ── Build owner email subject based on suspicious flag ──────────────────
  const ownerSubject = isSuspicious
    ? `⚠️ Suspicious Inquiry – ${serviceLabel} | ${name}`
    : `New Quote Request – ${serviceLabel} | ${name}`;

  // ── Suspicious warning banner for owner email ──────────────────────────
  const suspiciousBanner = isSuspicious
    ? `<div style="background-color: #FEF3CD; border: 1px solid #F5C518; padding: 12px 16px; margin-bottom: 20px; border-radius: 6px; font-size: 14px; color: #856404;">
        ⚠️ <strong>Suspicious Submission</strong> — reCAPTCHA score: <strong>${recaptchaScore}</strong> (threshold: 0.7). Review this inquiry carefully before responding.
      </div>`
    : "";

  const results = await Promise.allSettled([
    // Owner notification
    resend.emails.send({
      from: "JK Electricals <onboarding@resend.dev>",
      to: ownerEmail,
      reply_to: email,
      subject: ownerSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0A3A5C; padding: 24px; text-align: center;">
            <h1 style="color: #00B4D8; margin: 0; font-size: 22px;">${isSuspicious ? "⚠️ Suspicious Inquiry" : "New Quote Request"}</h1>
            <p style="color: #ffffff99; margin: 6px 0 0;">JK Electricals – Contact Form Submission</p>
          </div>
          <div style="padding: 28px;">
            ${suspiciousBanner}
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 10px 0; color: #555; width: 140px;"><strong>Name</strong></td>
                <td style="padding: 10px 0; color: #111;">${name}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 0; color: #555;"><strong>Email</strong></td>
                <td style="padding: 10px 0; color: #111;"><a href="mailto:${email}" style="color: #0A3A5C;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #555;"><strong>Phone</strong></td>
                <td style="padding: 10px 0; color: #111;"><a href="tel:${phone}" style="color: #0A3A5C;">${phone}</a></td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 0; color: #555;"><strong>Service</strong></td>
                <td style="padding: 10px 0; color: #111;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #555; vertical-align: top;"><strong>Details</strong></td>
                <td style="padding: 10px 0; color: #111;">${messageText}</td>
              </tr>
              ${recaptchaScore !== null ? `
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 0; color: #555;"><strong>reCAPTCHA Score</strong></td>
                <td style="padding: 10px 0; color: ${isSuspicious ? '#dc3545' : '#28a745'}; font-weight: bold;">${recaptchaScore}</td>
              </tr>` : ""}
            </table>
          </div>
          <div style="background: #f0f4f8; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            Submitted via jkelectricals.com contact form
          </div>
        </div>
      `,
    }),

    // Customer confirmation (no suspicious info exposed)
    resend.emails.send({
      from: "JK Electricals <onboarding@resend.dev>",
      to: email,
      subject: "We've received your request – JK Electricals",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0A3A5C; padding: 24px; text-align: center;">
            <h1 style="color: #00B4D8; margin: 0; font-size: 22px;">Thank You, ${name}!</h1>
            <p style="color: #ffffff99; margin: 6px 0 0;">JK Electricals</p>
          </div>
          <div style="padding: 28px; font-size: 15px; color: #333; line-height: 1.6;">
            <p>We've received your quote request for <strong>${serviceLabel}</strong> and will get back to you within <strong>24 hours</strong>.</p>
            <p>If you need immediate assistance, feel free to call us directly:</p>
            <p style="font-size: 18px; font-weight: bold; color: #0A3A5C;">📞 +91 9448069346</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 13px; color: #888;">JK Electricals · #212, KIADB Housing Layout, Hebbal 2nd Stage, Mysore – 570017</p>
          </div>
        </div>
      `,
    }),
  ]);

  // Debug: log full Resend API results
  console.log('[Mailer] Sending to owner:', ownerEmail);
  console.log('[Mailer] Owner result:', JSON.stringify(results[0], null, 2));
  console.log('[Mailer] Customer result:', JSON.stringify(results[1], null, 2));

  return [
    {
      type: "owner",
      recipient: ownerEmail,
      status: results[0].status === "fulfilled" ? "sent" : "failed",
      error: results[0].status === "rejected" ? results[0].reason?.message : null,
    },
    {
      type: "customer",
      recipient: email,
      status: results[1].status === "fulfilled" ? "sent" : "failed",
      error: results[1].status === "rejected" ? results[1].reason?.message : null,
    },
  ];
};

/*
⚠️ One important note on the `from` address:
While testing, Resend only allows sending from `onboarding@resend.dev`. Once you add and verify your own domain in Resend, change it to something like:
  from: "JK Electricals <noreply@yourdomain.com>"
*/