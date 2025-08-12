"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { useArticleGlobalContext } from "@/providers/article-context";

interface NewsHeaderProps {
  onSearch: () => void;
}

export function NewsHeader({ onSearch }: NewsHeaderProps) {
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

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    filters?.selectedDate ? new Date(filters.selectedDate) : undefined
  );

  if (!filters) {
    return (
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    updateFilter(
      "selectedDate",
      date ? date.toISOString().split("T")[0] : ""
    );
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-primary truncate">HeadlineHub</h1>
              <Badge variant="secondary" className="inline-flex text-xs">
                Gambia
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block">
              Stay updated with the latest news from multiple sources
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={filters.searchQuery || ""}
                onChange={(e) => updateFilter("searchQuery", e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSearch()}
                className="pl-10 text-base"
              />
            </div>
            <Button onClick={onSearch} size="default" className="shrink-0">
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden lg:flex gap-3 flex-1">
            <Select
              value={filters.selectedSource || "all"}
              onValueChange={(value) => updateFilter("selectedSource", value)}
            >
              <SelectTrigger className="w-[180px]">
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
              value={filters.selectedCategory || "all"}
              onValueChange={(value) => updateFilter("selectedCategory", value)}
            >
              <SelectTrigger className="w-[180px]">
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

            <DatePicker
              date={selectedDate}
              onDateChange={handleDateChange}
              placeholder="Filter by date"
              className="w-[180px]"
            />

            <Button variant="outline" onClick={clearFilters} size="default">
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="relative bg-transparent"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 rounded-full" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] p-4">
                <SheetHeader>
                  <SheetTitle>Filter Articles</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div className="flex gap-4 w-full">
                    <div className="flex-1 w-full">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Source
                      </label>
                      <Select
                        value={filters.selectedSource || "all"}
                        onValueChange={(value) => updateFilter("selectedSource", value)}
                      >
                        <SelectTrigger className="w-full">
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
                    </div>

                    <div className="flex-1 w-full">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Category
                      </label>
                      <Select
                        value={filters.selectedCategory || "all"}
                        onValueChange={(value) => updateFilter("selectedCategory", value)}
                      >
                        <SelectTrigger className="w-full">
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
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Date
                    </label>
                    <DatePicker
                      date={selectedDate}
                      onDateChange={handleDateChange}
                      placeholder="Filter by date"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="flex-1 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                    <Button
                      onClick={() => setIsFiltersOpen(false)}
                      className="flex-1"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            {filters.selectedSource && filters.selectedSource !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Source: {filters.selectedSource}
                <button
                  onClick={() => updateFilter("selectedSource", "all")}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.selectedCategory && filters.selectedCategory !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Category: {filters.selectedCategory}
                <button
                  onClick={() => updateFilter("selectedCategory", "all")}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.selectedDate && (
              <Badge variant="secondary" className="text-xs">
                Date: {format(new Date(filters.selectedDate), "MMM dd, yyyy")}
                <button
                  onClick={() => {
                    updateFilter("selectedDate", "");
                    setSelectedDate(undefined);
                  }}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </header>
  );
}