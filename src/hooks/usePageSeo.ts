import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { Locale } from '../data/site'

type SeoOptions = {
  title: string
  description: string
  locale: Locale
}

const siteName = 'arcwove'
const defaultSiteUrl = 'https://structurebeforewords.github.io/VELIRO'

function ensureMeta(name: string, attribute: 'name' | 'property') {
  const selector = `meta[${attribute}="${name}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  return element
}

function ensureLink(rel: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  return element
}

function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '')
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin.replace(/\/+$/, '')
  }

  return defaultSiteUrl
}

function buildCanonicalUrl(siteUrl: string, pathname: string, search: string) {
  const url = new URL(siteUrl)
  const basePath = url.pathname.replace(/\/$/, '')
  const routePath = pathname === '/' ? '/' : pathname

  url.pathname = `${basePath}/`.replace(/\/+/g, '/')
  url.search = ''
  url.hash = routePath === '/' ? '' : `#${routePath}${search}`

  return url.toString()
}

function buildOgImageUrl(siteUrl: string) {
  const url = new URL(siteUrl)
  const basePath = url.pathname.replace(/\/$/, '')

  url.pathname = `${basePath}/og-image.svg`.replace(/\/+/g, '/')
  url.search = ''
  url.hash = ''

  return url.toString()
}

export function usePageSeo({ title, description, locale }: SeoOptions) {
  const location = useLocation()

  useEffect(() => {
    const siteUrl = getSiteUrl()
    const canonicalUrl = buildCanonicalUrl(
      siteUrl,
      location.pathname,
      location.search,
    )
    const ogImageUrl = buildOgImageUrl(siteUrl)

    document.title = `${title} | ${siteName}`

    ensureMeta('description', 'name').content = description
    ensureMeta('robots', 'name').content = 'index,follow,max-image-preview:large'
    ensureMeta('og:site_name', 'property').content = siteName
    ensureMeta('og:title', 'property').content = `${title} | ${siteName}`
    ensureMeta('og:description', 'property').content = description
    ensureMeta('og:type', 'property').content = 'website'
    ensureMeta('og:locale', 'property').content = locale === 'ja' ? 'ja_JP' : 'en_US'
    ensureMeta('og:url', 'property').content = canonicalUrl
    ensureMeta('og:image', 'property').content = ogImageUrl
    ensureMeta('twitter:card', 'name').content = 'summary_large_image'
    ensureMeta('twitter:title', 'name').content = `${title} | ${siteName}`
    ensureMeta('twitter:description', 'name').content = description
    ensureMeta('twitter:image', 'name').content = ogImageUrl
    ensureLink('canonical').href = canonicalUrl
  }, [description, locale, location.pathname, location.search, title])
}