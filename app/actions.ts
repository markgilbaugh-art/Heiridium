'use server'

import { books } from '@/lib/content/books'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_MS = 2500

function str(formData: FormData, key: string, max = 200) {
  const v = formData.get(key)
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function looksLikeSpam(formData: FormData) {
  if (str(formData, 'company_website')) return true
  const started = Number(str(formData, 'started_at'))
  return !Number.isFinite(started) || Date.now() - started < MIN_FILL_MS
}

async function deliver(subject: string, lines: [string, string][]) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL
  const from = process.env.LEADS_FROM_EMAIL ?? 'Heiridium <onboarding@resend.dev>'

  if (!apiKey || !to) {
    if (process.env.VERCEL_ENV === 'production') {
      throw new Error('Lead delivery is not configured')
    }
    console.log('[v0] Lead delivery not configured; submission accepted in non-production:', subject)
    return
  }

  const text = lines.map(([k, v]) => `${k}: ${v || '—'}`).join('\n')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text }),
  })
  if (!res.ok) throw new Error(`Lead delivery failed with ${res.status}`)
}

const REVENUE_BANDS = ['Under $3M', '$3M–$10M', '$10M–$30M', 'Over $30M', 'Prefer not to say']
const TIMELINES = ['Within 12 months', '1–3 years', '3–5 years', '5+ years', 'Not sure yet']
const INDUSTRIES = ['HVAC', 'Plumbing', 'HVAC and plumbing', 'Other home services']

export async function submitConsultation(_prev: FormState, formData: FormData): Promise<FormState> {
  if (looksLikeSpam(formData)) {
    return { status: 'success' }
  }

  const data = {
    name: str(formData, 'name', 120),
    email: str(formData, 'email', 200),
    phone: str(formData, 'phone', 40),
    company: str(formData, 'company', 160),
    industry: str(formData, 'industry', 60),
    revenue: str(formData, 'revenue', 60),
    timeline: str(formData, 'timeline', 60),
    message: str(formData, 'message', 2000),
  }

  const fieldErrors: Record<string, string> = {}
  if (data.name.length < 2) fieldErrors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(data.email)) fieldErrors.email = 'Please enter a valid email address.'
  if (data.company.length < 2) fieldErrors.company = 'Please enter your company name.'
  if (!INDUSTRIES.includes(data.industry)) fieldErrors.industry = 'Please choose your industry.'
  if (data.revenue && !REVENUE_BANDS.includes(data.revenue)) fieldErrors.revenue = 'Please choose a revenue range.'
  if (data.timeline && !TIMELINES.includes(data.timeline)) fieldErrors.timeline = 'Please choose a timeline.'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors }
  }

  try {
    await deliver(`Private conversation request: ${data.company}`, [
      ['Name', data.name],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Company', data.company],
      ['Industry', data.industry],
      ['Revenue', data.revenue],
      ['Timeline', data.timeline],
      ['Message', data.message],
    ])
  } catch (err) {
    console.error('Consultation delivery error:', err instanceof Error ? err.message : err)
    return {
      status: 'error',
      message: 'We could not send your request. Please try again, or email us directly.',
    }
  }

  return {
    status: 'success',
    message: 'Thank you. A member of our team will reply within two business days to arrange a time.',
  }
}

export async function submitBookUpdates(_prev: FormState, formData: FormData): Promise<FormState> {
  if (looksLikeSpam(formData)) {
    return { status: 'success' }
  }

  const name = str(formData, 'name', 120)
  const email = str(formData, 'email', 200)
  const validSlugs = new Set(books.map((b) => b.slug))
  const selected = formData
    .getAll('books')
    .filter((v): v is string => typeof v === 'string' && validSlugs.has(v))

  const fieldErrors: Record<string, string> = {}
  if (!EMAIL_RE.test(email)) fieldErrors.email = 'Please enter a valid email address.'
  if (selected.length === 0) fieldErrors.books = 'Choose at least one book.'
  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors }
  }

  const titles = books.filter((b) => selected.includes(b.slug)).map((b) => b.title)
  try {
    await deliver('Book update signup', [
      ['Name', name],
      ['Email', email],
      ['Books', titles.join(', ')],
    ])
  } catch (err) {
    console.error('Book signup delivery error:', err instanceof Error ? err.message : err)
    return { status: 'error', message: 'We could not save your signup. Please try again shortly.' }
  }

  return {
    status: 'success',
    message: `You are on the list. We will email you when ${titles.length === 1 ? titles[0] : 'these books'} ${titles.length === 1 ? 'is' : 'are'} released.`,
  }
}
