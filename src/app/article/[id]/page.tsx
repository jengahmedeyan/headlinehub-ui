"use client"

import { useParams, useRouter } from "next/navigation"
import { useArticle } from "../../../hooks/use-article"
import { ArticleDetail } from "../../../components/article-detail/article-detail"
import { ArticleSkeleton } from "../../../components/article-detail/article-skeleton"
import { ArticleError } from "../../../components/article-detail/article-error"
import { BackToTop } from "../../../components/ui/back-to-top"

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { article, loading, error, refetch } = useArticle(params.id as string)

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <>
        <ArticleSkeleton />
        <BackToTop />
      </>
    )
  }

  if (error || !article) {
    return (
      <>
        <ArticleError error={error || "Article not found"} onBack={handleBack} onRetry={refetch} />
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <ArticleDetail article={article} onBack={handleBack} />
      <BackToTop />
    </>
  )
}
