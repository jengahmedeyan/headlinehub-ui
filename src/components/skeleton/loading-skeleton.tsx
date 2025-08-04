"use client";

import { ArticleCardSkeleton } from "./article-card";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
