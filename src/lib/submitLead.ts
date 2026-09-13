/**
 * Lead submission adapter.
 *
 * Every form on the site calls this one function, so swapping the transport
 * later is a change to this file alone rather than to six form components.
 *
 * Transport: Netlify Forms. No server of our own, no third-party account, no
 * cost at this site's volume (free tier is 100 submissions/month) — Netlify
 * scans the deployed HTML at build time for a form matching the name below
 * (see the hidden twin in index.html) and, from then on, POSTing to "/" with
 * that form-name registers a submission. Notification emails are configured
 * in the Netlify dashboard (Site settings → Forms → Form notifications),
 * not in code, and are not something this file can set up on its own.
 *
 * Honesty rule, carried over from before a transport existed: until
 * `LEAD_TRANSPORT_CONFIGURED` is true, the UI must NOT tell a visitor that
 * someone will be in touch. Callers render the fallback contact details
 * instead. Promising follow-up we cannot deliver is worse than no form.
 */

const NETLIFY_FORM_NAME = 'lead'

function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export type LeadKind =
  | 'trade-inquiry'
  | 'export-inquiry'
  | 'dealer-onboarding'
  | 'swatch-request'
  | 'catalogue-download'

export interface Lead {
  kind: LeadKind
  name: string
  company?: string
  email: string
  phone?: string
  message?: string
  /** Category slug, when the inquiry came from a collection page. */
  category?: string
  /** Export inquiries must acknowledge advance-payment-only terms. */
  acknowledgedExportTerms?: boolean
  meta?: Record<string, string>
}

export type LeadResult =
  | { status: 'delivered' }
  | { status: 'not-configured'; reason: string }
  | { status: 'error'; reason: string }

/** Drives the UI's success copy. False only if Netlify Forms is ever pulled out. */
export const LEAD_TRANSPORT_CONFIGURED = true

export async function submitLead(lead: Lead): Promise<LeadResult> {
  // Netlify Forms only runs on an actual Netlify deploy. The dev server
  // (`npm run dev`, and any other static host) has nothing at "/" to
  // receive this, so submissions are logged instead of thrown at a 404.
  if (import.meta.env.DEV) {
    console.info('[submitLead] dev mode, not posting to Netlify:', lead)
    return { status: 'not-configured', reason: 'Netlify Forms only runs on a Netlify deploy.' }
  }

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({
        'form-name': NETLIFY_FORM_NAME,
        'bot-field': '',
        kind: lead.kind,
        name: lead.name,
        company: lead.company ?? '',
        email: lead.email,
        phone: lead.phone ?? '',
        message: lead.message ?? '',
        category: lead.category ?? '',
        acknowledgedExportTerms: lead.acknowledgedExportTerms ? 'yes' : '',
        meta: lead.meta ? JSON.stringify(lead.meta) : '',
      }),
    })

    if (!response.ok) {
      return { status: 'error', reason: `Netlify Forms responded with ${response.status}.` }
    }
    return { status: 'delivered' }
  } catch {
    return { status: 'error', reason: 'The request failed before reaching Netlify.' }
  }
}
