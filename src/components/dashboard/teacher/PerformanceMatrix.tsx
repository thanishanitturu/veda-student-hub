import { CheckCircle2, Circle, Calendar, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Student, StudentQuizAttempt, StudentAssignmentAttempt, StudentProjectSubmission } from "@/data/mockData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PerformanceMatrixProps {
  title: string;
  subtitle: string;
  students: Student[];
  attempts: StudentQuizAttempt[] | StudentAssignmentAttempt[] | StudentProjectSubmission[];
  selectedItemId: string;
  maxScore: number;
  type: "quiz" | "assignment" | "project";
  onStudentClick?: (student: Student) => void;
}

export function PerformanceMatrix({
  title,
  subtitle,
  students,
  attempts,
  selectedItemId,
  maxScore,
  type,
  onStudentClick
}: PerformanceMatrixProps) {
  
  const getStudentData = (studentId: string) => {
    if (type === "quiz") {
      return (attempts as StudentQuizAttempt[]).find(a => 
        a.studentId === studentId && a.quizId === selectedItemId
      );
    } else if (type === "assignment") {
      return (attempts as StudentAssignmentAttempt[]).find(a => 
        a.studentId === studentId && a.assignmentId === selectedItemId
      );
    } else {
      return (attempts as StudentProjectSubmission[]).find(a => 
        a.studentId === studentId && a.projectId === selectedItemId
      );
    }
  };

  const getAttemptedCount = () => {
    if (type === "quiz") {
      return (attempts as StudentQuizAttempt[]).filter(a => 
        a.attempted && a.quizId === selectedItemId
      ).length;
    } else if (type === "assignment") {
      return (attempts as StudentAssignmentAttempt[]).filter(a => 
        a.submitted && a.assignmentId === selectedItemId
      ).length;
    } else {
      return (attempts as StudentProjectSubmission[]).filter(a => 
        a.submitted && a.projectId === selectedItemId
      ).length;
    }
  };

  const attemptedCount = getAttemptedCount();
  const notAttemptedCount = students.length - attemptedCount;

  const getScoreColor = (percentage?: number) => {
    if (!percentage) return "";
    if (percentage >= 80) return "bg-dashboard-green/10 text-dashboard-green";
    if (percentage >= 60) return "bg-dashboard-orange/10 text-dashboard-orange";
    return "bg-dashboard-red/10 text-dashboard-red";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500", 
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500"
    ];
    return colors[index % colors.length];
  };

  const statusLabel = type === "assignment" || type === "project" ? "Submitted" : "Attempted";
  const notStatusLabel = type === "assignment" || type === "project" ? "Not Submitted" : "Not Attempted";

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="bg-dashboard-green/10 text-dashboard-green border-dashboard-green/20 px-3 py-1.5 gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              {attemptedCount} {statusLabel}
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-dashboard-red/10 text-dashboard-red border-dashboard-red/20 px-3 py-1.5 gap-1.5"
            >
              <Circle className="w-4 h-4" />
              {notAttemptedCount} {notStatusLabel}
            </Badge>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Student
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              {type === "quiz" && (
                <th className="text-center px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Attempts
                </th>
              )}
              <th className="text-center px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {type === "quiz" ? "Best Score" : "Score"}
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Percentage
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const data = getStudentData(student.id);
              const isQuiz = type === "quiz";
              const quizData = data as StudentQuizAttempt | undefined;
              const submissionData = data as StudentAssignmentAttempt | StudentProjectSubmission | undefined;
              
              const hasAttempted = isQuiz ? quizData?.attempted : submissionData?.submitted;
              const score = isQuiz ? quizData?.bestScore : submissionData?.score;
              const percentage = isQuiz ? quizData?.bestPercentage : submissionData?.percentage;
              const dateField = isQuiz 
                ? (quizData?.attempts?.[quizData.attempts.length - 1]?.attemptDate)
                : submissionData?.submittedDate;

              return (
                <tr 
                  key={student.id} 
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => onStudentClick?.(student)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${getAvatarColor(index)} text-white font-semibold text-sm`}>
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {hasAttempted ? (
                      <Badge 
                        variant="outline" 
                        className="bg-dashboard-green/10 text-dashboard-green border-dashboard-green/20 gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {statusLabel}
                      </Badge>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className="bg-muted text-muted-foreground border-border gap-1"
                      >
                        <Circle className="w-3.5 h-3.5" />
                        {notStatusLabel}
                      </Badge>
                    )}
                  </td>
                  {isQuiz && (
                    <td className="px-6 py-4 text-center">
                      {quizData?.attempted && quizData.attempts ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dashboard-blue/10 text-dashboard-blue font-medium text-sm cursor-help">
                                <RotateCcw className="w-3.5 h-3.5" />
                                {quizData.attempts.length}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover text-popover-foreground">
                              <div className="space-y-1.5">
                                {quizData.attempts.map((att, i) => (
                                  <div key={i} className="flex items-center gap-3 text-sm">
                                    <span className="text-muted-foreground">Attempt {att.attemptNumber}:</span>
                                    <span className="font-medium">{att.score}/{att.maxScore}</span>
                                    <span className="text-muted-foreground">({att.percentage}%)</span>
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  )}
                  <td className="px-6 py-4 text-center">
                    {hasAttempted && score !== undefined ? (
                      <span className="font-semibold text-foreground">
                        {score}/{maxScore}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {hasAttempted && percentage !== undefined ? (
                      <Badge className={`${getScoreColor(percentage)} border-0 font-semibold`}>
                        {percentage}%
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {hasAttempted && dateField ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{dateField}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}