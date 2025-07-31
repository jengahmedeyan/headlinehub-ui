"use client"

import { Calendar, Tag, Globe, ExternalLink } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/date"
import { Article } from "@/types/article"

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <CardHeader className="pb-6">
      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Badge variant="default" className="text-sm">
          <Globe className="h-3 w-3 mr-1" />
          {article.source}
        </Badge>
        {article.category && (
          <Badge variant="outline" className="text-sm">
            <Tag className="h-3 w-3 mr-1" />
            {article.category}
          </Badge>
        )}
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(article.date)}
        </div>
      </div>

      <CardTitle className="text-2xl md:text-3xl leading-tight mb-4">{article.title}</CardTitle>

      <div className="flex items-center gap-3 pt-4 border-t">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <Button variant="default" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original
          </Button>
        </a>
      </div>
    </CardHeader>
  )
}
