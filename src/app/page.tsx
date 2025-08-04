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

export default function Page() {
  const {
    articles,
    sources,
    categories,
    loading,
    error,
    hasNextPage,
    loadingMore,
    bottomRef,
    filters,
    loadInitialData,
    handleSearch,
    clearFilters,
    updateFilter,
  } = useNews();

  if (loading) {
    return (
      <>
        <NewsHeaderSkeleton />
        <LoadingSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-2xl mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center mt-4">
          <Button onClick={loadInitialData}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsHeader
        sources={sources}
        categories={categories}
        filters={filters}
        onSearch={handleSearch}
        onClearFilters={clearFilters}
        onUpdateFilter={updateFilter}
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
