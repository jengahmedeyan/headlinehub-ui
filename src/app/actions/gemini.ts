"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SummaryResponse {
  success: boolean
  summary?: string
  error?: string
  cached?: boolean
}

export interface SavedSummary {
  id: string
  articleId: string
  summary: string
  title?: string
  createdAt: string
  updatedAt: string
}

export async function getSummary(articleId: string): Promise<SummaryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/${articleId}`)
    
    if (response.ok) {
      const data = await response.json()
      if (data.success && data.summary) {
        return {
          success: true,
          summary: data.summary.summary,
          cached: true
        }
      }
    }

    if (response.status === 404) {
      return {
        success: false,
        error: "No cached summary found"
      }
    }

    return {
      success: false,
      error: "Failed to fetch summary"
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch summary"
    }
  }
}

export async function generateAndSaveSummary(articleId: string, content: string, title: string): Promise<SummaryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        content,
        title,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || 'Failed to generate summary'
      }
    }

    const data = await response.json()
    return {
      success: true,
      summary: data.summary,
      cached: data.cached || false
    }
  } catch (error: unknown) {
    console.error("API error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate summary"
    }
  }
}

export async function deleteSummary(articleId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/${articleId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || 'Failed to delete summary'
      }
    }

    return { success: true }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete summary"
    }
  }
}

export async function getBulkSummaries(articleIds: string[]): Promise<Record<string, string>> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleIds }),
    })

    if (!response.ok) {
      return {}
    }

    const data = await response.json()
    return data.summaries || {}
  } catch (error) {
    console.error('Failed to fetch bulk summaries:', error)
    return {}
  }
}