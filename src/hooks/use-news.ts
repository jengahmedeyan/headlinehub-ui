"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isInitialLoad = useRef(true)

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
        getAllNews(1, ITEMS_PER_PAGE),
        getAvailableCategories(),
      ])

      if (newsResponse.success) {

        const uniqueArticles = newsResponse.data.filter(
          (article, index, self) => index === self.findIndex((a) => a.id === article.id),
        )
        setArticles(uniqueArticles)
        setSources(newsResponse.sources)
        setCategories(categoriesData)
        setHasNextPage(newsResponse.pagination?.hasNextPage ?? false)
        setCurrentPage(1)
      } else {
        setError(newsResponse.error || "Failed to load news")
      }
    } catch (err) {
      setError("Failed to load news data")
    } finally {
      setLoading(false)
      isInitialLoad.current = false
    }
  }

  const applyFilters = () => {
    let filtered = [...articles]

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.source.toLowerCase().includes(query),
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
        const uniqueArticles = response.data.filter(
          (article, index, self) => index === self.findIndex((a) => a.id === article.id),
        )
        setArticles(uniqueArticles)
        setSources(response.sources)
        setCurrentPage(1)
        setHasNextPage(false)
      } else {
        setError(response.error || "Search failed")
      }
    } catch (err) {
      setError("Search failed")
    } finally {
      setLoading(false)
    }
  }

  const loadMoreArticles = useCallback(async () => {
    if (!hasNextPage || loadingMore || filters.searchQuery.trim()) return
    
    setLoadingMore(true)
    const nextPage = currentPage + 1
    
    try {
      const newsResponse = await getAllNews(nextPage, ITEMS_PER_PAGE)
      if (newsResponse.success) {
        setArticles((prev) => {
          const existingIds = new Set(prev.map((article) => article.id))
          const newArticles = newsResponse.data.filter((article) => !existingIds.has(article.id))
          return [...prev, ...newArticles]
        })
        setCurrentPage(nextPage)
        setHasNextPage(newsResponse.pagination?.hasNextPage ?? false)
      }
    } catch (err) {
      console.error("Failed to load more articles:", err)
    } finally {
      setLoadingMore(false)
    }
  }, [hasNextPage, loadingMore, currentPage, filters.searchQuery])

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

  const generateUniqueKey = (article: Article, index: number): string => {
    return article.id || `${article.title}-${article.source}-${index}`
  }

  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !loadingMore && !loading) {
          loadMoreArticles()
        }
      },
      { 
        threshold: 0.4,
        rootMargin: '100px'
      }
    )

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current)
    }
  }, [hasNextPage, loadingMore, loading, loadMoreArticles])

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [articles, filters])

  useEffect(() => {
    if (!isInitialLoad.current && hasNextPage && !filters.searchQuery.trim()) {
      const timer = setTimeout(() => {
        setupObserver()
      }, 100)

      return () => {
        clearTimeout(timer)
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }
  }, [hasNextPage, filters.searchQuery, setupObserver, filteredArticles.length])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

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