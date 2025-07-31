"use client"

import { useState, useEffect } from "react"
import type { Article } from "@/types/article"
import { getArticleById } from "@/app/actions/news"


export function useArticle(id: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadArticle = async (articleId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getArticleById(articleId)

      if (response.success && response.data.length > 0) {
        setArticle(response.data[0])
      } else {
        setError(response.error || "Article not found")
      }
    } catch (err) {
      setError("Failed to load article")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadArticle(id)
    }
  }, [id])

  return {
    article,
    loading,
    error,
    refetch: () => id && loadArticle(id),
  }
}
