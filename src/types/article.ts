export interface Article {
  id: string
  title: string
  content: string
  source: string
  category?: string
  date: string
  link: string
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
