'use client'

import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitBookUpdates, type FormState } from '@/app/actions'
import { books } from '@/lib/content/books'
import { cn } from '@/lib/utils'
import { Field, FormMessage, SpamGuard, SubmitButton, inputClass } from './fields'

const initial: FormState = { status: 'idle' }

export function BookUpdatesForm({ defaultBook, tone = 'dark' }: { defaultBook?: string; tone?: 'dark' | 'light' }) {
  const [state, action] = useActionState(submitBookUpdates, initial)
  const e = state.fieldErrors ?? {}
  const light = tone === 'light'

  if (state.status === 'success') {
    return (
      <div role="status" className={cn('flex gap-3', light ? 'text-ivory' : 'text-ink')}>
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
        <p>{state.message ?? 'You are on the list.'}</p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className={cn('relative flex flex-col gap-5', light && '[&_label]:text-ivory')}>
      <SpamGuard />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="bu-name" label="First name" optional>
          <input id="bu-name" name="name" autoComplete="given-name" className={inputClass} />
        </Field>
        <Field id="bu-email" label="Email" error={e.email}>
          <input
            id="bu-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            aria-invalid={e.email ? true : undefined}
            aria-describedby={e.email ? 'bu-email-error' : undefined}
          />
        </Field>
      </div>
      <fieldset aria-describedby={e.books ? 'bu-books-error' : undefined}>
        <legend className={cn('text-sm font-medium', light ? 'text-ivory' : 'text-ink')}>Notify me about</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {books.map((b) => (
            <label key={b.slug} className={cn('flex items-center gap-3 text-sm', light ? 'text-ivory/85' : 'text-ink')}>
              <input
                type="checkbox"
                name="books"
                value={b.slug}
                defaultChecked={defaultBook ? defaultBook === b.slug : true}
                className="size-4 accent-[var(--gold)]"
              />
              {`Book ${b.numeral}: ${b.title}`}
            </label>
          ))}
        </div>
        {e.books && (
          <p id="bu-books-error" className="mt-2 text-sm text-destructive">
            {e.books}
          </p>
        )}
      </fieldset>
      <FormMessage status={state.status} message={state.message} />
      <SubmitButton className="self-start">Get Book Updates</SubmitButton>
    </form>
  )
}
