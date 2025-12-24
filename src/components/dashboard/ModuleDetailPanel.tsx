import { Module, QuizAttempt, Assignment } from "@/data/mockData";
import { QuizAttemptCard } from "./QuizAttemptCard";
import { AssignmentCard } from "./AssignmentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, TrendingUp } from "lucide-react";

interface ModuleDetailPanelProps {
  module: Module;
  onBack: () => void;
  onQuizClick: (quiz: QuizAttempt) => void;
  onAssignmentClick: (assignment: Assignment) => void;
}

export function ModuleDetailPanel({
  module,
  onBack,
  onQuizClick,
  onAssignmentClick,
}: ModuleDetailPanelProps) {
  const bestScore = module.quizzes.length > 0
    ? Math.max(...module.quizzes.map(q => q.totalScore))
    : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {module.name}
          </h2>
          {bestScore !== null && (
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Best Score: {bestScore}%
            </p>
          )}
        </div>
      </div>

      {/* Quiz Attempts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Quiz Attempts</h3>
        {module.quizzes.length > 0 ? (
          <div className="space-y-3">
            {module.quizzes.map((quiz, index) => (
              <QuizAttemptCard
                key={quiz.id}
                attempt={quiz}
                onClick={() => onQuizClick(quiz)}
                isLatest={index === module.quizzes.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl border border-dashed bg-muted/30 text-center">
            <p className="text-muted-foreground">No quiz attempts yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Complete the module quiz to see your results here</p>
          </div>
        )}
      </div>

      {/* Assignment */}
      {module.hasAssignment && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Assignment</h3>
          {module.assignment ? (
            <AssignmentCard
              assignment={module.assignment}
              onClick={() => onAssignmentClick(module.assignment!)}
            />
          ) : (
            <div className="p-8 rounded-xl border border-dashed bg-muted/30 text-center">
              <p className="text-muted-foreground">Assignment not submitted</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
