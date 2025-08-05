"use client"

import { useEffect, useState } from "react"
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

  const [backButtonLabel, setBackButtonLabel] = useState("Back to Articles")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasHistory = window.history.length > 1
      const referrer = document.referrer
      const currentDomain = window.location.origin
      const isInternalReferrer = referrer.startsWith(currentDomain)

      const label = hasHistory && isInternalReferrer
        ? "Back to Articles"
        : "Go to Home"

      setBackButtonLabel(label)
    }
  }, [])

  const handleBack = () => {
    if (typeof window === "undefined") {
      router.push("/")
      return
    }

    const hasHistory = window.history.length > 1
    const referrer = document.referrer
    const currentDomain = window.location.origin
    const isInternalReferrer = referrer.startsWith(currentDomain)

    if (hasHistory && isInternalReferrer) {
      router.back()
    } else {
      router.push("/")
    }
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
        <ArticleError
          error={error || "Article not found"}
          onBack={handleBack}
          onRetry={refetch}
        />
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <ArticleDetail
        article={article}
        onBack={handleBack}
        backButtonLabel={backButtonLabel}
      />
      <BackToTop />
    </>
  )
}
