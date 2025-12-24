import { Assignment } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, Clock, ChevronRight, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";

interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
}

function getScoreVariant(score: number): "success" | "primary" | "warning" | "destructive" {
  if (score >= 85) return "success";
  if (score >= 70) return "primary";
  if (score >= 50) return "warning";
  return "destructive";
}

export function AssignmentCard({ assignment, onClick }: AssignmentCardProps) {
  const variant = getScoreVariant(assignment.grade);

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-lg border border-stat-purple/20 bg-stat-purple/5 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-stat-purple/40 group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-stat-purple/10 text-stat-purple">
          <FileText className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground truncate">
              {assignment.title}
            </h4>
            <Badge variant="secondary" className="text-xs bg-stat-purple/10 text-stat-purple border-0">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Submitted
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(assignment.submittedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" />
              Reasoning: {assignment.reasoningScore}/{assignment.maxReasoningScore}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ProgressRing 
            value={assignment.grade} 
            size={50} 
            strokeWidth={5}
            variant={variant}
          />
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-stat-purple group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}
