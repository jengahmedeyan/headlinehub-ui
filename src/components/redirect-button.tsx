"use client"

import { Button } from "@/components/ui/button"
import { RedirectButtonProps } from "@/types/article"
import { ExternalLink, Globe } from "lucide-react"
import Link from "next/link"

export function RedirectButton({
  url,
  source,
  title,
  variant = "outline",
  size = "sm",
  className = "",
  showDomain = false,
}: RedirectButtonProps) {
  const createRedirectUrl = () => {
    const params = new URLSearchParams({
      url,
      source,
      title,
    })
    return `/redirect?${params.toString()}`
  }

  const domain = new URL(url).hostname

  return (
    <Link href={createRedirectUrl()}>
      <Button
        variant={variant}
        size={size}
        className={`group hover:bg-blue-50 hover:border-blue-300 transition-colors ${className}`}
      >
        <ExternalLink className="h-4 w-4 mr-2 group-hover:text-blue-600" />
        <span className="group-hover:text-blue-600">{showDomain ? `Read on ${domain}` : "Read Original"}</span>
        {showDomain && <Globe className="h-3 w-3 ml-1 group-hover:text-blue-600" />}
      </Button>
    </Link>
  )
}
