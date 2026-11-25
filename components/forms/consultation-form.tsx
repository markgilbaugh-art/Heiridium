'use client'

import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitConsultation, type FormState } from '@/app/actions'
import { Field, FormMessage, SpamGuard, SubmitButton, inputClass } from './fields'

const initial: FormState = { status: 'idle' }

export function ConsultationForm() {
  const [state, action] = useActionState(submitConsultation, initial)
  const e = state.fieldErrors ?? {}

  if (state.status === 'success') {
    return (
      <div role="status" className="border border-border bg-card p-10">
        <CheckCircle2 className="size-8 text-gold" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-semibold text-ink">Request received</h2>
        <p className="mt-3 text-muted-foreground">
          {state.message ?? 'Thank you. A member of our team will reply within two business days.'}
        </p>
      </div>
    )
  }

  const err = (k: string) => (e[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {})

  return (
    <form action={action} noValidate className="relative flex flex-col gap-6 border border-border bg-card p-6 md:p-10">
      <SpamGuard />
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Your name" error={e.name}>
          <input id="name" name="name" autoComplete="name" required className={inputClass} {...err('name')} />
        </Field>
        <Field id="email" label="Email" error={e.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} {...err('email')} />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </Field>
        <Field id="company" label="Company name" error={e.company}>
          <input id="company" name="company" autoComplete="organization" required className={inputClass} {...err('company')} />
        </Field>
        <Field id="industry" label="Industry" error={e.industry}>
          <select id="industry" name="industry" defaultValue="" required className={inputClass} {...err('industry')}>
            <option value="" disabled>
              Select one
            </option>
            <option>HVAC</option>
            <option>Plumbing</option>
            <option>HVAC and plumbing</option>
            <option>Other home services</option>
          </select>
        </Field>
        <Field id="revenue" label="Annual revenue" optional error={e.revenue}>
          <select id="revenue" name="revenue" defaultValue="" className={inputClass} {...err('revenue')}>
            <option value="">Select one</option>
            <option>Under $3M</option>
            <option>$3M–$10M</option>
            <option>$10M–$30M</option>
            <option>Over $30M</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
        <Field id="timeline" label="When might you consider a transition?" optional error={e.timeline}>
          <select id="timeline" name="timeline" defaultValue="" className={inputClass} {...err('timeline')}>
            <option value="">Select one</option>
            <option>Within 12 months</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
            <option>Not sure yet</option>
          </select>
        </Field>
      </div>
      <Field id="message" label="What would you like to discuss?" optional>
        <textarea id="message" name="message" rows={5} className={inputClass} />
      </Field>
      <p className="text-sm text-muted-foreground">
        Please do not include financial statements or tax documents here. If we need documents, we will provide a secure
        channel.
      </p>
      <FormMessage status={state.status} message={state.message} />
      <SubmitButton className="self-start">Request a Private Conversation</SubmitButton>
    </form>
  )
}
