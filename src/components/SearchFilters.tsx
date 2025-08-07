"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchFiltersProps } from "@/types/article";

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
  sources,
  categories,
  onSearch,
  onClearFilters,
}: SearchFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles, sources, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={onSearch} size="default">
            Search
          </Button>
        </div>
      </div>

      <Select value={selectedSource} onValueChange={setSelectedSource}>
        <SelectTrigger>
          <SelectValue placeholder="All Sources" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {sources.map((source) => (
            <SelectItem key={source} value={source}>
              {source}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Uncomment if you want to use category and date filters */}
      {/* 
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" onClick={onClearFilters} size="default">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      */}
    </div>
  );
}