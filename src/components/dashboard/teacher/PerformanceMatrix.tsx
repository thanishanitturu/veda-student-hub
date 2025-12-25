import { CheckCircle2, Circle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Student, StudentQuizAttempt, StudentAssignmentAttempt } from "@/data/mockData";

interface PerformanceMatrixProps {
  title: string;
  subtitle: string;
  students: Student[];
  attempts: (StudentQuizAttempt | StudentAssignmentAttempt)[];
  selectedItemId: string;
  maxScore: number;
  type: "quiz" | "assignment";
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
  const attemptedCount = attempts.filter(a => a.attempted && 
    (type === "quiz" ? (a as StudentQuizAttempt).quizId : (a as StudentAssignmentAttempt).assignmentId) === selectedItemId
  ).length;
  const notAttemptedCount = students.length - attemptedCount;

  const getStudentAttempt = (studentId: string) => {
    return attempts.find(a => 
      a.studentId === studentId && 
      (type === "quiz" ? (a as StudentQuizAttempt).quizId : (a as StudentAssignmentAttempt).assignmentId) === selectedItemId
    );
  };

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

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
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
              {attemptedCount} Attempted
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-dashboard-red/10 text-dashboard-red border-dashboard-red/20 px-3 py-1.5 gap-1.5"
            >
              <Circle className="w-4 h-4" />
              {notAttemptedCount} Not Attempted
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
              <th className="text-center px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Score
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
              const attempt = getStudentAttempt(student.id);
              const dateField = type === "quiz" 
                ? (attempt as StudentQuizAttempt)?.attemptDate 
                : (attempt as StudentAssignmentAttempt)?.submittedDate;

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
                    {attempt?.attempted ? (
                      <Badge 
                        variant="outline" 
                        className="bg-dashboard-green/10 text-dashboard-green border-dashboard-green/20 gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Attempted
                      </Badge>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className="bg-muted text-muted-foreground border-border gap-1"
                      >
                        <Circle className="w-3.5 h-3.5" />
                        Not Attempted
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {attempt?.attempted ? (
                      <span className="font-semibold text-foreground">
                        {attempt.score}/{maxScore}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {attempt?.attempted ? (
                      <Badge className={`${getScoreColor(attempt.percentage)} border-0 font-semibold`}>
                        {attempt.percentage}%
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {attempt?.attempted && dateField ? (
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