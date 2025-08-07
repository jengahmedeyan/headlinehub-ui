"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { Article, FilterState } from "@/types/article"
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

interface FilterHook {
  filters: FilterState
  updateFilter: (key: keyof FilterState, value: string) => void
  clearFilters: () => void
  applyFilters: (articles: Article[]) => Article[]
  hasActiveFilters: boolean
}

interface ArticleGlobalContextType {
  currentArticle: Article | null
  setCurrentArticle: (article: Article | null) => void
  
  showSummary: boolean
  setShowSummary: (show: boolean) => void
  summaryHook: SummaryHook
  
  filterHook: FilterHook
  
  availableSources: string[]
  setAvailableSources: (sources: string[]) => void
  availableCategories: string[]
  setAvailableCategories: (categories: string[]) => void
}

const ArticleGlobalContext = createContext<ArticleGlobalContextType | undefined>(undefined)

interface ArticleGlobalProviderProps {
  children: ReactNode
}

export function ArticleGlobalProvider({ children }: ArticleGlobalProviderProps) {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [availableSources, setAvailableSources] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  
  const summaryHook = useSummary()

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedSource: "all",
    selectedCategory: "all",
    selectedDate: "",
  })

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedSource: "all",
      selectedCategory: "all",
      selectedDate: "",
    })
  }, [])

  const applyFilters = useCallback((articles: Article[]): Article[] => {
    let filtered = [...articles]

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.source.toLowerCase().includes(query)
      )
    }

    if (filters.selectedSource !== "all") {
      filtered = filtered.filter((article) => article.source === filters.selectedSource)
    }

    if (filters.selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category === filters.selectedCategory)
    }

    if (filters.selectedDate) {
      filtered = filtered.filter((article) => article.date.startsWith(filters.selectedDate))
    }

    return filtered
  }, [filters])

  const hasActiveFilters = Boolean(
    filters.searchQuery.trim() ||
    filters.selectedSource !== "all" ||
    filters.selectedCategory !== "all" ||
    filters.selectedDate
  )

  const filterHook: FilterHook = {
    filters,
    updateFilter,
    clearFilters,
    applyFilters,
    hasActiveFilters,
  }

  const value: ArticleGlobalContextType = {
    currentArticle,
    setCurrentArticle,
    showSummary,
    setShowSummary,
    summaryHook,
    filterHook,
    availableSources,
    setAvailableSources,
    availableCategories,
    setAvailableCategories,
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