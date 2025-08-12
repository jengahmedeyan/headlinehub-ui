"use client";

import { useNews } from "../hooks/use-news";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { NewsHeader } from "../components/news-header";
import { ArticleCard } from "../components/article-card";
import { LoadingSkeleton } from "../components/skeleton/loading-skeleton";
import { EmptyState } from "../components/empty-state";
import { LoadMoreIndicator } from "../components/load-more-indicator";
import { BackToTop } from "../components/ui/back-to-top";
import { NewsHeaderSkeleton } from "@/components/skeleton/news-header";
import { useArticleGlobalContext } from "@/providers/article-context";
import { ErrorDisplay } from "@/components/error-display";

export default function Page() {
  const {
    articles,
    loading,
    error,
    hasNextPage,
    loadingMore,
    bottomRef,
    loadInitialData,
    handleSearch,
  } = useNews();

  const { 
      filterHook, 
    } = useArticleGlobalContext();
  
    const {
      clearFilters,
    } = filterHook;

  if (loading) {
    return (
      <>
        <NewsHeaderSkeleton />
        <LoadingSkeleton />
      </>
    );
  }

if (error) {
  return <ErrorDisplay message={error} onRetry={loadInitialData} />;
}

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsHeader
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <EmptyState onClearFilters={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {hasNextPage && (
          <div ref={bottomRef}>
            <LoadMoreIndicator isLoading={loadingMore} />
          </div>
        )}
      </main>

      <BackToTop />
    </div>
  );
}
