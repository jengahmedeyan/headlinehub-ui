"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArticleGlobalContext } from "@/providers/article-context";

interface SearchFiltersProps {
  onSearch: () => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const { 
    filterHook, 
    availableSources, 
    availableCategories 
  } = useArticleGlobalContext();

  const {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters
  } = filterHook;

  if (!filters) {
    return <div>Loading filters...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search articles, sources, or keywords..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={onSearch} size="default">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select 
          value={filters.selectedSource} 
          onValueChange={(value) => updateFilter("selectedSource", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {availableSources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.selectedCategory} 
          onValueChange={(value) => updateFilter("selectedCategory", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.selectedDate}
          onChange={(e) => updateFilter("selectedDate", e.target.value)}
          className="w-full"
        />

        <Button 
          variant="outline" 
          onClick={clearFilters} 
          disabled={!hasActiveFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filters active</span>
        </div>
      )}
    </div>
  );
}