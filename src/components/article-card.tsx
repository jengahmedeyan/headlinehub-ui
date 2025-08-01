"use client"

import { Clock, Tag, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Article } from "../types/article"
import { simpleSanitize, truncateHtmlContent } from "../utils/text"
import { formatDate } from "@/utils/date"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const createRedirectUrl = () => {
    const params = new URLSearchParams({
      url: article.link,
      source: article.source,
      title: article.title,
    })
    return `/redirect?${params.toString()}`
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs shrink-0">
            {article.source}
          </Badge>
          <div className="flex items-center text-xs text-gray-500 shrink-0">
            <Clock className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">{formatDate(article.date)}</span>
            <span className="sm:hidden">{formatDate(article.date).split(" ")[0]}</span>
          </div>
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight line-clamp-3">{article.title}</CardTitle>
        {article.category && (
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{article.category}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="flex-1 text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-4">
          <span
            dangerouslySetInnerHTML={{
              __html: simpleSanitize(truncateHtmlContent(article.content, 150)),
            }}
          />
        </CardDescription>
        <div className="flex items-center justify-between pt-2 border-t gap-2">
          <Link href={createRedirectUrl()} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full group hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:text-blue-600" />
              <span className="hidden sm:inline group-hover:text-blue-600">Read Original Article</span>
              <span className="sm:hidden group-hover:text-blue-600">Read Original</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
