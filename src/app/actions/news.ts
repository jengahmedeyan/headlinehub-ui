"use server";

export interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  link: string;
  category: string;
  scrapedAt: string;
}

export interface NewsResponse {
  success: boolean;
  data: Article[];
  count: number;
  sources: string[];
  error?: string;
  pagination?: {
    hasNextPage: boolean;
    currentPage: number;
  };
}

const baseURL = process.env.baseURL + "api";

export async function getAllNews(
  page: number = 1,
  limit: number = 10,
  dateParam?: string
): Promise<NewsResponse> {
  try {
    let query = `?page=${page}&limit=${limit}`;
    if (dateParam) {
      query += `&date=${encodeURIComponent(dateParam)}`;
    }
    const url = `${baseURL}/news${query}`;
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.log("failed to fetch");
    return {
      success: false,
      data: [],
      count: 0,
      sources: [],
      error: "Failed to fetch news",
    };
  }
}

export async function searchNews(query: string): Promise<NewsResponse> {
  try {
    const response = await fetch(
      `${baseURL}/news/search?q=${encodeURIComponent(query)}`
    );
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      count: 0,
      sources: [],
      error: "Search failed",
    };
  }
}

export async function getNewsBySource(source: string): Promise<NewsResponse> {
  try {
    const response = await fetch(
      `${baseURL}/news/source/${encodeURIComponent(source)}`
    );
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      count: 0,
      sources: [],
      error: "Failed to fetch by source",
    };
  }
}

export async function getArticleById(id: string): Promise<NewsResponse> {
  try {
    const response = await fetch(`${baseURL}/news/${id}`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      count: 0,
      sources: [],
      error: "Failed to fetch article",
    };
  }
}

export async function getAvailableCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${baseURL}/categories`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    return ["General"];
  }
}
