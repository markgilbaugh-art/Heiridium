import { launchArticles } from './articles-launch'
import { publishedArticles } from './articles-published'
import { queuedArticles } from './articles-queue'
import { industryFamily } from './industries'
import type { Article, Industry } from './types'
import type { TopicSlug } from './topics'

const allArticles: Article[] = [...publishedArticles, ...launchArticles, ...queuedArticles]

export function isLive(article: Article, now = Date.now()) {
  return (
    (article.status === 'published' || article.status === 'scheduled') &&
    Date.parse(article.publishAt) <= now
  )
}

function byNewest(a: Article, b: Article) {
  return Date.parse(b.publishAt) - Date.parse(a.publishAt)
}

export function getLiveArticles(now = Date.now()) {
  return allArticles.filter((a) => isLive(a, now)).sort(byNewest)
}

export function getArticle(slug: string, { includeDrafts = false } = {}) {
  const article = allArticles.find((a) => a.slug === slug)
  if (!article) return undefined
  if (includeDrafts || isLive(article)) return article
  return undefined
}

export function getArticlesForTopic(topic: TopicSlug) {
  return getLiveArticles().filter((a) => a.topic === topic || a.tags?.includes(topic))
}

export function getArticlesForBook(bookSlug: string, limit = 3) {
  return getLiveArticles()
    .filter((a) => a.relatedBooks.includes(bookSlug))
    .slice(0, limit)
}

export function getArticlesForIndustry(industry: Industry, limit?: number) {
  const family = industryFamily(industry)
  const matches = getLiveArticles()
    .filter((a) => a.industries.some((i) => family.includes(i)))
    .sort((a, b) => Number(b.industries.length < 4) - Number(a.industries.length < 4))
  return limit ? matches.slice(0, limit) : matches
}

export function getEditorialQueue() {
  return allArticles.filter((a) => !isLive(a)).sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt))
}

export function getAllSlugs() {
  return allArticles.map((a) => a.slug)
}
