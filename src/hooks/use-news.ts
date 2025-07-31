"use client"

import { useState, useEffect, useRef } from "react"
import type { Article, FilterState } from "../types/article"
import { ITEMS_PER_PAGE } from "../constants"
import { getAllNews, getAvailableCategories, searchNews } from "@/app/actions/news"

export function useNews() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedSource: "all",
    selectedCategory: "all",
    selectedDate: "",
  })

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [newsResponse, categoriesData] = await Promise.all([
        getAllNews(currentPage, ITEMS_PER_PAGE),
        getAvailableCategories(),
      ])

      if (newsResponse.success) {
        // Deduplicate articles by ID
        const uniqueArticles = newsResponse.data.filter(
          (article, index, self) => index === self.findIndex((a) => a.id === article.id),
        )
        setArticles(uniqueArticles)
        setSources(newsResponse.sources)
        setCategories(categoriesData)
        setHasNextPage(newsResponse.pagination?.hasNextPage ?? false)
      } else {
        setError(newsResponse.error || "Failed to load news")
      }
    } catch (err) {
      setError("Failed to load news data")
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...articles]

    // Search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.source.toLowerCase().includes(query),
      )
    }

    // Source filter
    if (filters.selectedSource !== "all") {
      filtered = filtered.filter((article) => article.source === filters.selectedSource)
    }

    // Category filter
    if (filters.selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category === filters.selectedCategory)
    }

    // Date filter
    if (filters.selectedDate) {
      filtered = filtered.filter((article) => article.date.startsWith(filters.selectedDate))
    }

    setFilteredArticles(filtered)
  }

  const handleSearch = async () => {
    if (!filters.searchQuery.trim()) {
      loadInitialData()
      return
    }

    try {
      setLoading(true)
      const response = await searchNews(filters.searchQuery)
      if (response.success) {
        // Deduplicate search results
        const uniqueArticles = response.data.filter(
          (article, index, self) => index === self.findIndex((a) => a.id === article.id),
        )
        setArticles(uniqueArticles)
        setSources(response.sources)
      } else {
        setError(response.error || "Search failed")
      }
    } catch (err) {
      setError("Search failed")
    } finally {
      setLoading(false)
    }
  }

  const loadMoreArticles = async () => {
    if (!hasNextPage || loadingMore) return
    setLoadingMore(true)
    const nextPage = currentPage + 1
    const newsResponse = await getAllNews(nextPage, ITEMS_PER_PAGE)
    if (newsResponse.success) {
      // Deduplicate articles by ID to prevent duplicate keys
      setArticles((prev) => {
        const existingIds = new Set(prev.map((article) => article.id))
        const newArticles = newsResponse.data.filter((article) => !existingIds.has(article.id))
        return [...prev, ...newArticles]
      })
      setCurrentPage(nextPage)
      setHasNextPage(newsResponse.pagination?.hasNextPage ?? false)
    }
    setLoadingMore(false)
  }

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedSource: "all",
      selectedCategory: "all",
      selectedDate: "",
    })
  }

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Helper function to generate unique keys for articles
  const generateUniqueKey = (article: Article, index: number): string => {
    // Use article ID if available and unique, otherwise create a composite key
    return article.id || `${article.title}-${article.source}-${index}`
  }

  // Effects
  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [articles, filters])

  useEffect(() => {
    if (!hasNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreArticles()
        }
      },
      { threshold: 1 },
    )

    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current)
      }
    }
  }, [hasNextPage, loadingMore, articles])

  return {
    articles: filteredArticles,
    sources,
    categories,
    loading,
    error,
    hasNextPage,
    loadingMore,
    bottomRef,
    filters,
    loadInitialData,
    handleSearch,
    clearFilters,
    updateFilter,
    generateUniqueKey,
  }
}
