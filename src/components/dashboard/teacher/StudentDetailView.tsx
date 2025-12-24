import { useState } from "react";
import { Student, courseData, Module, QuizAttempt, Assignment } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModuleCard } from "../ModuleCard";
import { ModuleDetailPanel } from "../ModuleDetailPanel";
import { QuizDetailModal } from "../QuizDetailModal";
import { AssignmentDetailModal } from "../AssignmentDetailModal";
import { StatCard } from "../StatCard";
import { ArrowLeft, Mail, BookOpen, TrendingUp, Target } from "lucide-react";

interface StudentDetailViewProps {
  student: Student;
  onBack: () => void;
}

export function StudentDetailView({ student, onBack }: StudentDetailViewProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizAttempt | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();

  // Calculate student-specific stats
  const totalQuizzes = courseData.modules.flatMap(m => m.quizzes).length;
  const totalAssignments = courseData.modules.filter(m => m.hasAssignment && m.assignment).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 mt-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-4 flex-1">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {student.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {student.enrolledCourses.map((course, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedModule ? (
        <ModuleDetailPanel
          module={selectedModule}
          onBack={() => setSelectedModule(null)}
          onQuizClick={setSelectedQuiz}
          onAssignmentClick={setSelectedAssignment}
        />
      ) : (
        <>
          {/* Student Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Quizzes Completed"
              value={totalQuizzes}
              icon={<BookOpen className="w-5 h-5" />}
              variant="primary"
            />
            <StatCard
              title="Average Score"
              value={`${student.averageScore}%`}
              icon={<TrendingUp className="w-5 h-5" />}
              variant="success"
            />
            <StatCard
              title="Course Progress"
              value={`${student.overallProgress}%`}
              icon={<Target className="w-5 h-5" />}
              variant="warning"
            />
          </div>

          {/* Module Performance */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Module Performance</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {courseData.modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onClick={() => setSelectedModule(module)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <QuizDetailModal
        quiz={selectedQuiz}
        open={!!selectedQuiz}
        onOpenChange={(open) => !open && setSelectedQuiz(null)}
      />
      <AssignmentDetailModal
        assignment={selectedAssignment}
        open={!!selectedAssignment}
        onOpenChange={(open) => !open && setSelectedAssignment(null)}
      />
    </div>
  );
}
