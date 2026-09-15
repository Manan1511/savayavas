/**
 * Lead submission adapter.
 *
 * Every form on the site calls this one function, so swapping the transport
 * is a change to this file alone rather than to multiple form components.
 *
 * Transport: StaticForms (https://api.staticforms.dev/submit).
 * A third-party form-handling endpoint for static websites. Form submissions
 * are routed directly to the email registered with the accessKey / apiKey.
 *
 * Honesty rule: until a key is configured (via VITE_STATIC_FORMS_ACCESS_KEY or VITE_STATIC_FORMS_KEY),
 * the UI must NOT tell a visitor that someone will be in touch. In development or
 * if unconfigured, we log the payload to the console and return { status: 'not-configured' },
 * allowing the caller to render direct fallback contact details instead.
 */

const STATIC_FORMS_ENDPOINT = 'https://api.staticforms.dev/submit'
const STATIC_FORMS_REPLY_TO = '@'
const DEFAULT_SUBJECT_PREFIX = '[Savayavas & Co.]'

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

interface StaticFormsPayload {
  apiKey: string
  accessKey: string
  name: string
  email: string
  phone?: string
  subject: string
  replyTo: string
  honeypot: string
  message: string
}

interface StaticFormsResponse {
  success: boolean
  message?: string
}

const KIND_LABELS: Record<LeadKind, string> = {
  'trade-inquiry': 'Trade Inquiry',
  'export-inquiry': 'Export Inquiry',
  'dealer-onboarding': 'Dealer Onboarding',
  'swatch-request': 'Swatch Request',
  'catalogue-download': 'Catalogue Download',
}

function getStaticFormsKey(): string | undefined {
  return (
    import.meta.env.VITE_STATIC_FORMS_ACCESS_KEY ||
    import.meta.env.VITE_STATIC_FORMS_KEY ||
    import.meta.env.VITE_STATIC_FORMS_API_KEY
  )?.trim()
}

function buildStructuredMessage(lead: Lead): string {
  const parts: string[] = []

  parts.push(`Inquiry Type: ${KIND_LABELS[lead.kind] ?? lead.kind}`)
  parts.push(`Name: ${lead.name}`)
  if (lead.company) parts.push(`Company: ${lead.company}`)
  parts.push(`Email: ${lead.email}`)
  if (lead.phone) parts.push(`Phone: ${lead.phone}`)
  if (lead.category) parts.push(`Collection / Category: ${lead.category}`)
  if (lead.acknowledgedExportTerms !== undefined) {
    parts.push(`Export Terms Acknowledged: ${lead.acknowledgedExportTerms ? 'Yes' : 'No'}`)
  }
  if (lead.meta && Object.keys(lead.meta).length > 0) {
    for (const [key, value] of Object.entries(lead.meta)) {
      parts.push(`${key}: ${value}`)
    }
  }

  parts.push('\n--- Message ---')
  parts.push(lead.message?.trim() || '(No additional message provided)')

  return parts.join('\n')
}

/** Drives the UI's success copy. True when StaticForms key is configured. */
export const LEAD_TRANSPORT_CONFIGURED = Boolean(getStaticFormsKey())

export async function submitLead(lead: Lead): Promise<LeadResult> {
  const key = getStaticFormsKey()

  if (!key) {
    console.info('[submitLead] StaticForms key is not configured. Submission payload:', lead)
    return {
      status: 'not-configured',
      reason: 'StaticForms key is not configured. Set VITE_STATIC_FORMS_ACCESS_KEY or VITE_STATIC_FORMS_KEY to enable automated delivery.',
    }
  }

  const subject = `${DEFAULT_SUBJECT_PREFIX} ${KIND_LABELS[lead.kind] ?? lead.kind} from ${lead.name}`
  const payload: StaticFormsPayload = {
    apiKey: key,
    accessKey: key,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    subject,
    replyTo: STATIC_FORMS_REPLY_TO,
    honeypot: '',
    message: buildStructuredMessage(lead),
  }

  try {
    const response = await fetch(STATIC_FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return {
        status: 'error',
        reason: `StaticForms returned HTTP status ${response.status}.`,
      }
    }

    const data = (await response.json()) as StaticFormsResponse
    if (data.success) {
      return { status: 'delivered' }
    }

    return {
      status: 'error',
      reason: data.message || 'StaticForms rejected the submission.',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown network failure'
    return {
      status: 'error',
      reason: `Failed to connect to StaticForms: ${message}`,
    }
  }
}
