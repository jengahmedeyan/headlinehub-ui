export interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  link: string;
  category: string;
  scrapedAt: string;
  summary?: string;
}
export interface ArticleObjectProps {
  article: Article
}

export interface ArticleSummaryProps {
  article: Article
  variant?: "card" | "inline" | "modal"
  className?: string
}

export interface NewsResponse {
  success: boolean
  data: Article[]
  sources: string[]
  error?: string
  pagination?: {
    hasNextPage: boolean
  }
}

export interface FilterState {
  searchQuery: string
  selectedSource: string
  selectedCategory: string
  selectedDate: string
}


export interface NewsHeaderProps {
  sources: string[];
  categories: string[];
  filters: FilterState;
  onSearch: () => void;
  onClearFilters: () => void;
  onUpdateFilter: (key: keyof FilterState, value: string) => void;
}

export interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  sources: string[];
  categories: string[];
  onSearch: () => void;
  onClearFilters: () => void;
}

export interface RedirectButtonProps {
  url: string
  source: string
  title: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  showDomain?: boolean
}

export interface QuickRedirectModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  source: string
  title: string
}

export interface LoadMoreIndicatorProps {
  isLoading: boolean
}

export interface EmptyStateProps {
  onClearFilters: () => void
}