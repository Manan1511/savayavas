/**
 * Lead submission adapter.
 *
 * There is deliberately no backend yet (docs/PLAN.md §1). Every form on the
 * site calls this one function, so wiring a real endpoint later is a change to
 * this file alone rather than to six form components.
 *
 * Honesty rule: until `transport` is real, the UI must NOT tell a visitor that
 * someone will be in touch. Callers render the `fallback` contact details
 * instead. Promising follow-up we cannot deliver is worse than no form.
 */

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

/** Flips to true the moment a transport exists. Drives the UI's success copy. */
export const LEAD_TRANSPORT_CONFIGURED = false

export async function submitLead(lead: Lead): Promise<LeadResult> {
  if (!LEAD_TRANSPORT_CONFIGURED) {
    if (import.meta.env.DEV) {
      console.info('[submitLead] no transport configured — captured locally:', lead)
    }
    return {
      status: 'not-configured',
      reason: 'No backend is connected yet.',
    }
  }

  // Real transport lands here (serverless endpoint, or a form service).
  return { status: 'error', reason: 'Transport flagged as configured but not implemented.' }
}
