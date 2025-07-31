"use client"

import { CardContent } from "@/components/ui/card"
import { simpleSanitize } from "../../utils/text"
import { Article } from "@/types/article"
import { formatDate } from "@/utils/date"

interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <CardContent>
      <div
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: simpleSanitize(article.content),
        }}
      />

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
