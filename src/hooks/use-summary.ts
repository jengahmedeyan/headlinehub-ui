"use client"

import { deleteSummary, generateAndSaveSummary, getBulkSummaries, getSummary, SummaryResponse } from "@/app/actions/gemini"
import { useState } from "react"

export function useSummary() {
  const [summaries, setSummaries] = useState<Record<string, string>>({})
  const [loadingSummaries, setLoadingSummaries] = useState<Record<string, boolean>>({})
  const [summaryErrors, setSummaryErrors] = useState<Record<string, string>>({})
  const [cachedSummaries, setCachedSummaries] = useState<Record<string, boolean>>({})

  const loadBulkSummaries = async (articleIds: string[]) => {
    try {
      const bulkSummaries = await getBulkSummaries(articleIds)
      setSummaries(prev => ({ ...prev, ...bulkSummaries }))
      
      const cached: Record<string, boolean> = {}
      Object.keys(bulkSummaries).forEach(id => {
        cached[id] = true
      })
      setCachedSummaries(prev => ({ ...prev, ...cached }))
    } catch (error) {
      console.error('Failed to load bulk summaries:', error)
    }
  }

  const generateSummary = async (articleId: string, content: string, title: string, forceRegenerate = false) => {
    if (summaries[articleId] && !forceRegenerate) {
      return summaries[articleId]
    }

    setLoadingSummaries((prev) => ({ ...prev, [articleId]: true }))
    setSummaryErrors((prev) => ({ ...prev, [articleId]: "" }))

    try {
      let response: SummaryResponse

      if (!forceRegenerate) {
        response = await getSummary(articleId)
        
        if (response.success && response.summary) {
          setSummaries((prev) => ({ ...prev, [articleId]: response.summary! }))
          setCachedSummaries((prev) => ({ ...prev, [articleId]: true }))
          return response.summary
        }
      }

      response = await generateAndSaveSummary(articleId, content, title)

      if (response.success && response.summary) {
        setSummaries((prev) => ({ ...prev, [articleId]: response.summary! }))
        setCachedSummaries((prev) => ({ ...prev, [articleId]: response.cached || false }))
        return response.summary
      } else {
        const error = response.error || "Failed to generate summary"
        setSummaryErrors((prev) => ({ ...prev, [articleId]: error }))
        throw new Error(error)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate summary"
      setSummaryErrors((prev) => ({ ...prev, [articleId]: errorMessage }))
      throw error
    } finally {
      setLoadingSummaries((prev) => ({ ...prev, [articleId]: false }))
    }
  }

  const clearSummary = async (articleId: string) => {
    try {
      await deleteSummary(articleId)
      
      setSummaries((prev) => {
        const newSummaries = { ...prev }
        delete newSummaries[articleId]
        return newSummaries
      })
      setSummaryErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[articleId]
        return newErrors
      })
      setCachedSummaries((prev) => {
        const newCached = { ...prev }
        delete newCached[articleId]
        return newCached
      })
    } catch (error) {
      console.error('Failed to delete summary:', error)
    }
  }

  const regenerateSummary = async (articleId: string, content: string, title: string) => {
    return generateSummary(articleId, content, title, true)
  }

  return {
    summaries,
    loadingSummaries,
    summaryErrors,
    cachedSummaries,
    generateSummary,
    regenerateSummary,
    clearSummary,
    loadBulkSummaries,
  }
}
