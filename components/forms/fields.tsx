'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { buttonClasses } from '@/components/site/button-link'

export const inputClass =
  'w-full border border-input bg-background px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/30 aria-[invalid=true]:border-destructive'

export function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function SpamGuard() {
  const [startedAt] = useState(() => String(Date.now()))
  return (
    <>
      <input type="hidden" name="started_at" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </>
  )
}

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={cn(buttonClasses('gold'), 'disabled:opacity-60', className)}>
      {pending ? 'Sending…' : children}
    </button>
  )
}

export function FormMessage({ status, message }: { status: string; message?: string }) {
  if (!message || status === 'idle') return null
  return (
    <p
      role={status === 'error' ? 'alert' : 'status'}
      className={cn('text-sm', status === 'error' ? 'text-destructive' : 'text-ink')}
    >
      {message}
    </p>
  )
}
