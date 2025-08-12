import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Alert variant="destructive" className="max-w-2xl animate-in fade-in-50 slide-in-from-top-2">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <div className="flex-1">
            <AlertTitle className="font-semibold">Something went wrong</AlertTitle>
            <AlertDescription className="mt-1 text-sm text-muted-foreground">
              {message}
            </AlertDescription>
            <div className="mt-4">
              <Button variant="outline" onClick={onRetry}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
}
