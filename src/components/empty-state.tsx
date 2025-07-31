"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 mb-4">
        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No articles found</h3>
        <p>Try adjusting your search criteria or filters</p>
      </div>
      <Button onClick={onClearFilters} variant="outline">
        Clear Filters
      </Button>
    </div>
  )
}
