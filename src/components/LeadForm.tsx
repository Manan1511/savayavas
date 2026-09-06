import { useId, useState } from 'react'
import { submitLead, type Lead, type LeadKind, type LeadResult } from '@/lib/submitLead'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

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
  submitLabel,
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
  const ui = useLocaleContent(uiEn, uiHi)
  const formId = useId()
  const [selectedKind, setSelectedKind] = useState<LeadKind>(typeOptions?.[0]?.value ?? kind)
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '', message: '', extra: '' })
  const [exportAck, setExportAck] = useState(false)
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<LeadResult | null>(null)

  // The acknowledgment is required either because the caller fixed this form
  // to export inquiries (showExportAck), or because the visitor picked
  // "Export Inquiry" from a type select that also offers other kinds — the
  // requirement follows the selection, not just the form's static config.
  const needsExportAck = showExportAck || selectedKind === 'export-inquiry'

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  const nameValid = values.name.trim().length > 0
  const ackValid = !needsExportAck || exportAck
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
      acknowledgedExportTerms: needsExportAck ? exportAck : undefined,
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
            {ui.leadForm.enquiringAboutLabel}
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
          {ui.leadForm.regarding} <span className="text-ink">{categoryLabel}</span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`${formId}-name`}>
            {ui.leadForm.nameLabel} <span aria-hidden className="text-brass">*</span>
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
              {ui.leadForm.nameError}
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${formId}-company`}>
            {ui.leadForm.companyLabel}
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
            {ui.leadForm.emailLabel} <span aria-hidden className="text-brass">*</span>
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
              {ui.leadForm.emailError}
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor={`${formId}-phone`}>
            {ui.leadForm.phoneLabel}
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
            {ui.leadForm.messageLabel}
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

      {needsExportAck && (
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={exportAck}
            onChange={(e) => setExportAck(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 accent-brass"
          />
          {ui.leadForm.exportAckLabel}
        </label>
      )}
      {touched && needsExportAck && !exportAck && (
        <p role="alert" className="text-xs text-brass">
          {ui.leadForm.exportAckError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-block bg-ink px-7 py-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-paper transition-colors duration-300 hover:bg-brass disabled:opacity-60"
      >
        {submitting ? ui.leadForm.sending : (submitLabel ?? ui.common.sendEnquiry)}
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
  const site = useLocaleContent(siteEn, siteHi)
  const ui = useLocaleContent(uiEn, uiHi)

  if (result.status === 'delivered') {
    return (
      <p className="text-sm leading-relaxed text-ink">{ui.leadForm.deliveredMessage}</p>
    )
  }

  return (
    <div className="border border-greige bg-ivory p-6">
      <p className="text-sm leading-relaxed text-ink">{ui.leadForm.notConfiguredMessage}</p>
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
