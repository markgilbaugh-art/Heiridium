import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/academy/article-view'
import { getArticle, getArticlesForTopic, getLiveArticles } from '@/lib/content/articles'
import type { Article } from '@/lib/content/types'
import { pageMetadata } from '@/lib/site'

export const revalidate = 300

export function generateStaticParams() {
  return getLiveArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return pageMetadata({
    title: article.seo?.title ?? `${article.title} | Heiridium Academy`,
    description: article.seo?.description ?? article.summary,
    path: `/academy/${article.slug}`,
    image: article.seo?.ogImage,
    type: 'article',
  })
}

export function relatedFor(article: Article) {
  const explicit = (article.relatedArticles ?? []).map((s) => getArticle(s)).filter((a) => a !== undefined)
  const sameTopic = getArticlesForTopic(article.topic).filter((a) => a.slug !== article.slug)
  const seen = new Set<string>()
  return [...explicit, ...sameTopic].filter((a) => !seen.has(a.slug) && seen.add(a.slug)).slice(0, 3)
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  return <ArticleView article={article} related={relatedFor(article)} />
}
