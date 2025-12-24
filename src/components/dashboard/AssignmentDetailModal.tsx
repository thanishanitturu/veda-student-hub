import { Assignment } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressRing } from "./ProgressRing";
import { FileText, Brain, Calendar, MessageSquare } from "lucide-react";

interface AssignmentDetailModalProps {
  assignment: Assignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignmentDetailModal({ assignment, open, onOpenChange }: AssignmentDetailModalProps) {
  if (!assignment) return null;

  const gradeVariant = assignment.grade >= 85 ? "success" : assignment.grade >= 70 ? "primary" : "warning";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-stat-purple/10 text-stat-purple">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl">{assignment.title}</span>
              <p className="text-sm font-normal text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                Submitted: {new Date(assignment.submittedAt).toLocaleString()}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="p-6 space-y-6">
            {/* Grade Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border bg-card text-center">
                <ProgressRing value={assignment.grade} size={80} strokeWidth={8} variant={gradeVariant} />
                <div className="mt-3">
                  <div className="text-lg font-semibold text-foreground">Overall Grade</div>
                  <div className="text-sm text-muted-foreground">{assignment.grade}/{assignment.maxGrade} points</div>
                </div>
              </div>
              <div className="p-5 rounded-xl border bg-card text-center">
                <ProgressRing 
                  value={assignment.reasoningScore} 
                  maxValue={assignment.maxReasoningScore}
                  size={80} 
                  strokeWidth={8} 
                  variant="primary" 
                />
                <div className="mt-3">
                  <div className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Reasoning Score
                  </div>
                  <div className="text-sm text-muted-foreground">{assignment.reasoningScore}/{assignment.maxReasoningScore} points</div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Assignment Question</h4>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-foreground leading-relaxed">{assignment.questionText}</p>
              </div>
            </div>

            {/* User Submission */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Your Submission</h4>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">{assignment.userAnswer}</p>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                AI Grading Feedback
              </h4>
              <div className="p-4 rounded-lg bg-stat-purple/5 border border-stat-purple/20">
                <p className="text-sm text-muted-foreground leading-relaxed">{assignment.feedback}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
