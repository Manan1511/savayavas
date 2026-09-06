import { useId, useState } from 'react'
import { submitLead, type Lead, type LeadKind, type LeadResult } from '@/lib/submitLead'
import { site } from '@/content/site.en'

export interface LeadFormTypeOption {
  value: LeadKind
  label: string
}

/**
 * The one form component every inquiry on the site goes through.
 *
 * Honesty rule, carried over from submitLead() itself: while
 * LEAD_TRANSPORT_CONFIGURED is false, this must never tell a visitor someone
 * will be in touch. `not-configured` and `error` both render the same direct
 * contact fallback instead of a fake success state, since promising follow-up
 * we cannot deliver is worse than no form at all.
 */
export function LeadForm({
  kind,
  typeOptions,
  category,
  categoryLabel,
  showExportAck = false,
  extraField,
  submitLabel = 'Send Enquiry',
}: {
  kind: LeadKind
  /** Renders a select of inquiry types; the chosen value becomes the lead kind. */
  typeOptions?: LeadFormTypeOption[]
  category?: string
  categoryLabel?: string
  showExportAck?: boolean
  extraField?: { id: string; label: string; placeholder?: string }
  submitLabel?: string
}) {
  const formId = useId()
  const [selectedKind, setSelectedKind] = useState<LeadKind>(typeOptions?.[0]?.value ?? kind)
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '', message: '', extra: '' })
  const [exportAck, setExportAck] = useState(false)
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<LeadResult | null>(null)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  const nameValid = values.name.trim().length > 0
  const ackValid = !showExportAck || exportAck
  const canSubmit = nameValid && emailValid && ackValid

  const field = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!canSubmit || submitting) return

    setSubmitting(true)
    const lead: Lead = {
      kind: selectedKind,
      name: values.name.trim(),
      company: values.company.trim() || undefined,
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      message: values.message.trim() || undefined,
      category,
      acknowledgedExportTerms: showExportAck ? exportAck : undefined,
      meta: extraField && values.extra ? { [extraField.id]: values.extra } : undefined,
    }
    setResult(await submitLead(lead))
    setSubmitting(false)
  }

  // Once submitted, the form gives way to either a real confirmation (once a
  // backend exists) or the honest fallback. Never both, never neither.
  if (result) return <LeadFormResult result={result} />

  const labelCls = 'block text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-ink-soft'
  const inputCls =
    'mt-1.5 w-full border-b border-greige bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-brass'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {typeOptions && typeOptions.length > 1 && (
        <div>
          <label className={labelCls} htmlFor={`${formId}-type`}>
            I am enquiring about
          </label>
          <select
            id={`${formId}-type`}
            className={`${inputCls} bg-paper`}
            value={selectedKind}
            onChange={(e) => setSelectedKind(e.target.value as LeadKind)}
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {categoryLabel && (
        <p className="text-xs text-stone">
          Regarding: <span className="text-ink">{categoryLabel}</span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`${formId}-name`}>
            Name <span aria-hidden className="text-brass">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={field('name')}
            aria-invalid={touched && !nameValid}
            aria-describedby={touched && !nameValid ? `${formId}-name-err` : undefined}
            className={inputCls}
          />
          {touched && !nameValid && (
            <p id={`${formId}-name-err`} role="alert" className="mt-1 text-xs text-brass">
              Please tell us your name.
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${formId}-company`}>
            Company
          </label>
          <input
            id={`${formId}-company`}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={field('company')}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor={`${formId}-email`}>
            Email <span aria-hidden className="text-brass">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={field('email')}
            aria-invalid={touched && !emailValid}
            aria-describedby={touched && !emailValid ? `${formId}-email-err` : undefined}
            className={inputCls}
          />
          {touched && !emailValid && (
            <p id={`${formId}-email-err`} role="alert" className="mt-1 text-xs text-brass">
              Enter a valid email address.
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${formId}-phone`}>
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={field('phone')}
            className={inputCls}
          />
        </div>

        {extraField && (
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor={`${formId}-extra`}>
              {extraField.label}
            </label>
            <input
              id={`${formId}-extra`}
              type="text"
              placeholder={extraField.placeholder}
              value={values.extra}
              onChange={field('extra')}
              className={inputCls}
            />
          </div>
        )}

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${formId}-message`}>
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            rows={3}
            value={values.message}
            onChange={field('message')}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      {showExportAck && (
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={exportAck}
            onChange={(e) => setExportAck(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 accent-brass"
          />
          I understand that export orders require full payment in advance, prior to production.
        </label>
      )}
      {touched && showExportAck && !exportAck && (
        <p role="alert" className="text-xs text-brass">
          Please confirm you understand the export payment terms.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-block bg-ink px-7 py-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-paper transition-colors duration-300 hover:bg-brass disabled:opacity-60"
      >
        {submitting ? 'Sending...' : submitLabel}
      </button>
    </form>
  )
}

/**
 * Shown after submission. `delivered` is unreachable until a transport is
 * wired up (LEAD_TRANSPORT_CONFIGURED is false), but the branch is written
 * now so turning the transport on later requires no UI work.
 */
function LeadFormResult({ result }: { result: LeadResult }) {
  if (result.status === 'delivered') {
    return (
      <p className="text-sm leading-relaxed text-ink">
        Thank you. Your enquiry has been sent, and our team will be in touch shortly.
      </p>
    )
  }

  return (
    <div className="border border-greige bg-ivory p-6">
      <p className="text-sm leading-relaxed text-ink">
        Our online form is not connected yet, so this message could not be sent automatically. Please reach us
        directly instead:
      </p>
      <ul className="mt-4 space-y-1.5 text-sm">
        <li>
          <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} className="text-brass hover:text-ink">
            {site.contact.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${site.contact.email}`} className="text-brass hover:text-ink">
            {site.contact.email}
          </a>
        </li>
      </ul>
    </div>
  )
}
