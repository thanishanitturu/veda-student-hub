import { Module } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, ChevronRight, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
  index: number;
}

function getScoreVariant(score: number): "success" | "primary" | "warning" | "destructive" {
  if (score >= 85) return "success";
  if (score >= 70) return "primary";
  if (score >= 50) return "warning";
  return "destructive";
}

export function ModuleCard({ module, onClick, index }: ModuleCardProps) {
  const hasQuizzes = module.quizzes.length > 0;
  const latestQuiz = hasQuizzes ? module.quizzes[module.quizzes.length - 1] : null;
  const bestScore = hasQuizzes 
    ? Math.max(...module.quizzes.map(q => q.totalScore))
    : 0;

  return (
    <div
      onClick={onClick}
      className="module-card group animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {module.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {hasQuizzes ? (
              <>
                <Badge variant="secondary" className="gap-1">
                  <Trophy className="w-3 h-3" />
                  {module.quizzes.length} {module.quizzes.length === 1 ? 'Attempt' : 'Attempts'}
                </Badge>
                <Badge 
                  className={cn(
                    "gap-1",
                    getScoreVariant(bestScore) === "success" && "bg-success/10 text-success border-success/20",
                    getScoreVariant(bestScore) === "primary" && "bg-primary/10 text-primary border-primary/20",
                    getScoreVariant(bestScore) === "warning" && "bg-warning/10 text-warning border-warning/20",
                    getScoreVariant(bestScore) === "destructive" && "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                  variant="outline"
                >
                  Best: {bestScore}%
                </Badge>
              </>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Not Attempted
              </Badge>
            )}

            {module.hasAssignment && (
              <Badge variant="outline" className="gap-1 bg-stat-purple/10 text-stat-purple border-stat-purple/20">
                <FileText className="w-3 h-3" />
                Assignment
              </Badge>
            )}
          </div>

          {latestQuiz && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Last attempt: {new Date(latestQuiz.date).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
