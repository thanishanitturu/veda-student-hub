import { QuizAttempt } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";

interface QuizAttemptCardProps {
  attempt: QuizAttempt;
  onClick: () => void;
  isLatest?: boolean;
}

function getScoreVariant(score: number): "success" | "primary" | "warning" | "destructive" {
  if (score >= 85) return "success";
  if (score >= 70) return "primary";
  if (score >= 50) return "warning";
  return "destructive";
}

export function QuizAttemptCard({ attempt, onClick, isLatest }: QuizAttemptCardProps) {
  const variant = getScoreVariant(attempt.totalScore);

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200 hover:shadow-md group",
        isLatest ? "border-primary/30 bg-primary/5" : "border-border/50 hover:border-primary/20"
      )}
    >
      <div className="flex items-center gap-4">
        <ProgressRing 
          value={attempt.totalScore} 
          size={60} 
          strokeWidth={6}
          variant={variant}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground truncate">
              Attempt {attempt.attemptNumber}
            </h4>
            {isLatest && (
              <Badge variant="secondary" className="text-xs">
                Latest
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {attempt.duration}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              {attempt.questions.length} Questions
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {new Date(attempt.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className={cn(
            "text-2xl font-bold",
            variant === "success" && "text-success",
            variant === "primary" && "text-primary",
            variant === "warning" && "text-warning",
            variant === "destructive" && "text-destructive"
          )}>
            {attempt.totalScore}%
          </div>
          <div className="text-xs text-muted-foreground">
            {attempt.totalScore}/{attempt.maxScore}
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
