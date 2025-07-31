"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArticleHeader } from "./article-header"
import { ArticleContent } from "./article-content"
import { BackButton } from "./back-button"
import { Article } from "@/types/article"

interface ArticleDetailProps {
  article: Article
  onBack: () => void
}

export function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null // or a simple loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={onBack} />

          <Card>
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
          </Card>
        </div>
      </div>
    </div>
  )
}
