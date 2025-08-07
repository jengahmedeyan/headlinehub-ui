"use client"

import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { isTruncated, simpleSanitize } from "../../utils/text"
import { Article } from "@/types/article"
import { formatDate } from "@/utils/date"
import { ArticleSummary } from "../article-summary"
import { useArticleGlobalContext } from "@/providers/article-context"

export function ArticleContent() {
  const { currentArticle: article, showSummary } = useArticleGlobalContext()

  if (!article) {
    return null
  }

  const contentIsTruncated = isTruncated(article.content)

  return (
    <CardContent>

        {showSummary && (
        <div className="mb-4">
          <ArticleSummary article={article} variant="inline" />
        </div>
      )}
      <div
        className="prose max-w-none text-gray-800 leading-relaxed text-xl"
        dangerouslySetInnerHTML={{
          __html: simpleSanitize(article.content),
        }}
      />

      {contentIsTruncated && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">
                This article appears to be truncated
              </p>
              <p className="text-sm mb-3">
                The full content may only be available on the original source. 
                Click below to read the complete article.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="text-white"
          >
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Read Full Article
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t bg-gray-50 -mx-6 px-6 rounded-b-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Source: {article.source}</p>
            <p>Published: {formatDate(article.date)}</p>
          </div>
        </div>
      </div>
    </CardContent>
  )
}