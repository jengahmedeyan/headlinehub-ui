"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  RefreshCw,
  Trash2,
  AlertCircle,
  Database,
  Zap,
} from "lucide-react";
import { Article } from "@/types/article";
import { useArticleGlobalContext } from "@/providers/article-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ArticleSummaryProps {
  article: Article;
  variant?: "card" | "inline";
}

export function ArticleSummary({
  article,
  variant = "card",
}: ArticleSummaryProps) {
  const { summaryHook } = useArticleGlobalContext();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    summaries,
    loadingSummaries,
    summaryErrors,
    cachedSummaries,
    generateSummary,
  } = summaryHook;

  const summary = summaries[article.id];
  const isLoading = loadingSummaries[article.id];
  const error = summaryErrors[article.id];
  const isCached = cachedSummaries[article.id];

  const handleGenerateSummary = async () => {
    if (isLoading) return;

    setIsGenerating(true);
    try {
      await generateSummary(article.id, article.content, article.title);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (variant === "inline") {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2">
        <div className="flex items-start gap-3 mb-3">
          <Sparkles className="hidden sm:inline h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <h3 className="font-semibold text-blue-900">AI Summary</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="shrink-0">
                    {isCached ? (
                      <Database className="h-4 w-4 text-green-600" />
                    ) : (
                      null
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isCached ? "Loaded from cache" : "Freshly generated"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {isLoading || isGenerating ? (
              <div className="flex items-center gap-2 text-blue-700">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Generating summary...</span>
              </div>
            ) : error ? (
              <div className="flex items-start gap-2 text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm mb-2">{error}</p>
                  <Button
                    onClick={handleGenerateSummary}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : summary ? (
              <div>
                <p className="text-blue-800 text-md leading-relaxed mb-3">
                  {summary}
                </p>
              </div>
            ) : (
              <Button
                onClick={handleGenerateSummary}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Generate Summary
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Sparkles className="h-5 w-5" />
          AI Summary
          {isCached && (
            <span className="text-xs text-blue-500 font-normal ml-auto">
              Cached
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || isGenerating ? (
          <div className="flex items-center gap-2 text-blue-700">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Generating summary...</span>
          </div>
        ) : error ? (
          <div className="flex items-start gap-2 text-red-700">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm mb-2">{error}</p>
              <Button
                onClick={handleGenerateSummary}
                size="sm"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : summary ? (
          <div>
            <p className="text-blue-800 leading-relaxed mb-4">{summary}</p>
          </div>
        ) : (
          <Button onClick={handleGenerateSummary} size="sm" variant="outline">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Summary
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
