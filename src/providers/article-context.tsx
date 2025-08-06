"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Article } from "@/types/article"
import { useSummary } from "@/hooks/use-summary"

interface SummaryHook {
  summaries: Record<string, string>
  loadingSummaries: Record<string, boolean>
  summaryErrors: Record<string, string>
  cachedSummaries: Record<string, boolean>
  generateSummary: (articleId: string, content: string, title: string, forceRegenerate?: boolean) => Promise<string>
  regenerateSummary: (articleId: string, content: string, title: string) => Promise<string>
  clearSummary: (articleId: string) => Promise<void>
  loadBulkSummaries: (articleIds: string[]) => Promise<void>
}

interface ArticleGlobalContextType {
  currentArticle: Article | null
  setCurrentArticle: (article: Article | null) => void
  showSummary: boolean
  setShowSummary: (show: boolean) => void
  summaryHook: SummaryHook
}

const ArticleGlobalContext = createContext<ArticleGlobalContextType | undefined>(undefined)

interface ArticleGlobalProviderProps {
  children: ReactNode
}

export function ArticleGlobalProvider({ children }: ArticleGlobalProviderProps) {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const summaryHook = useSummary()

  const value: ArticleGlobalContextType = {
    currentArticle,
    setCurrentArticle,
    showSummary,
    setShowSummary,
    summaryHook,
  }

  return (
    <ArticleGlobalContext.Provider value={value}>
      {children}
    </ArticleGlobalContext.Provider>
  )
}

export function useArticleGlobalContext() {
  const context = useContext(ArticleGlobalContext)
  if (context === undefined) {
    throw new Error('useArticleGlobalContext must be used within an ArticleGlobalProvider')
  }
  return context
}
