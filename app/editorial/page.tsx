import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/components/academy/article-card'
import { ArticleView } from '@/components/academy/article-view'
import { Container } from '@/components/site/sections'
import { getArticle, getEditorialQueue, isLive } from '@/lib/content/articles'
import { getTopic } from '@/lib/content/topics'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Editorial queue',
  robots: { index: false, follow: false },
}

function authorized(token: string | undefined) {
  const secret = process.env.PREVIEW_SECRET
  if (!secret) return process.env.VERCEL_ENV !== 'production'
  return token === secret
}

export default async function EditorialPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; slug?: string }>
}) {
  const { token, slug } = await searchParams
  if (!authorized(token)) notFound()
  const q = token ? `token=${encodeURIComponent(token)}&` : ''

  if (slug) {
    const article = getArticle(slug, { includeDrafts: true })
    if (!article) notFound()
    return (
      <ArticleView
        article={article}
        related={[]}
        banner={
          <div className="bg-gold px-4 py-3 text-center text-sm font-medium text-ink">
            {`Private preview · status: ${article.status}${article.requiresProfessionalReview ? ' · requires professional review' : ''} · publishes ${formatDate(article.publishAt)}`}
            <Link href={`/editorial${token ? `?token=${encodeURIComponent(token)}` : ''}`} className="ml-3 underline">
              Back to queue
            </Link>
          </div>
        }
      />
    )
  }

  const queue = getEditorialQueue()
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold text-ink">Editorial queue</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Upcoming Academy articles. Scheduled articles go live automatically on their publish date. Drafts and in-review
        articles stay private until their status changes.
      </p>
      <div className="mt-10 overflow-x-auto border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-secondary text-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Publish date</th>
              <th scope="col" className="px-4 py-3 font-medium">Title</th>
              <th scope="col" className="px-4 py-3 font-medium">Topic</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 font-medium">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {queue.map((a) => (
              <tr key={a.slug}>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(a.publishAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/editorial?${q}slug=${a.slug}`} className="text-ink underline-offset-4 hover:underline">
                    {a.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{getTopic(a.topic)?.name}</td>
                <td className="px-4 py-3 capitalize text-ink">{isLive(a) ? 'live' : a.status.replace('-', ' ')}</td>
                <td className="px-4 py-3 text-ink">{a.requiresProfessionalReview ? 'Required' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}
