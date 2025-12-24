import { useState } from "react";
import { courseData, getStudentStats, Module, QuizAttempt, Assignment } from "@/data/mockData";
import { StatCard } from "./StatCard";
import { ModuleCard } from "./ModuleCard";
import { ModuleDetailPanel } from "./ModuleDetailPanel";
import { QuizDetailModal } from "./QuizDetailModal";
import { AssignmentDetailModal } from "./AssignmentDetailModal";
import { 
  BookOpen, 
  ClipboardCheck, 
  TrendingUp, 
  Target,
  GraduationCap 
} from "lucide-react";

export function StudentDashboard() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizAttempt | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const stats = getStudentStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">{courseData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {selectedModule ? (
          <ModuleDetailPanel
            module={selectedModule}
            onBack={() => setSelectedModule(null)}
            onQuizClick={setSelectedQuiz}
            onAssignmentClick={setSelectedAssignment}
          />
        ) : (
          <div className="space-y-8">
            {/* Quick Stats */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Quizzes Completed"
                  value={stats.totalQuizzes}
                  subtitle={`${stats.modulesCompleted} modules`}
                  icon={<BookOpen className="w-5 h-5" />}
                  variant="primary"
                />
                <StatCard
                  title="Average Quiz Score"
                  value={`${stats.avgQuizScore}%`}
                  subtitle="Across all attempts"
                  icon={<TrendingUp className="w-5 h-5" />}
                  trend={{ value: 5, isPositive: true }}
                  variant="success"
                />
                <StatCard
                  title="Assignments Submitted"
                  value={stats.totalAssignments}
                  subtitle={`Avg: ${stats.avgAssignmentScore}%`}
                  icon={<ClipboardCheck className="w-5 h-5" />}
                  variant="primary"
                />
                <StatCard
                  title="Course Progress"
                  value={`${stats.completionRate}%`}
                  subtitle={`${stats.modulesCompleted}/${stats.totalModules} modules`}
                  icon={<Target className="w-5 h-5" />}
                  variant="warning"
                />
              </div>
            </section>

            {/* Module List */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Course Modules
              </h2>
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
            </section>
          </div>
        )}
      </main>

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
