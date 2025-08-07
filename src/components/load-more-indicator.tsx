"use client"

import type { LoadMoreIndicatorProps } from "@/types/article"
import { Loader2 } from "lucide-react"

export function LoadMoreIndicator({ isLoading }: LoadMoreIndicatorProps) {
  return (
    <div className="flex justify-center items-center py-8">
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading more articles...</span>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">Scroll down to load more articles</div>
      )}
    </div>
  )
}
