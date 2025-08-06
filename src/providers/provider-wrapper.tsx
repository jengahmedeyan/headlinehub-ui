"use client"

import { ReactNode } from "react"
import { ArticleGlobalProvider } from "./article-context"

interface ProviderWrapperProps {
  children: ReactNode
}

export function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <ArticleGlobalProvider>
      {children}
    </ArticleGlobalProvider>
  )
}
