import { useState, useMemo } from "react";
import { 
  studentsData, 
  courseData, 
  Student,
  moduleQuizzes,
  assignmentsList,
  courseProject,
  studentQuizAttempts,
  studentAssignmentAttempts,
  studentProjectSubmissions
} from "@/data/mockData";
import { QuizSelector } from "./QuizSelector";
import { PerformanceMatrix } from "./PerformanceMatrix";
import { StudentDetailView } from "./StudentDetailView";
import { GraduationCap } from "lucide-react";

type ViewType = "quiz" | "assignment" | "student" | "project";

export function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("quiz");
  const [selectedQuizModule, setSelectedQuizModule] = useState(moduleQuizzes[0]?.id || "");
  const [selectedAssignment, setSelectedAssignment] = useState(assignmentsList[0]?.id || "");
  const [studentSearch, setStudentSearch] = useState("");

  // Filter students based on search
  const filteredStudents = useMemo(() => {
    if (!studentSearch) return studentsData;
    const query = studentSearch.toLowerCase();
    return studentsData.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query)
    );
  }, [studentSearch]);

  // Get current selection details
  const getCurrentMatrixData = () => {
    switch (activeView) {
      case "quiz":
        const quiz = moduleQuizzes.find(q => q.id === selectedQuizModule);
        return {
          title: quiz?.moduleName || "Select a Module",
          subtitle: "Module Quiz Performance",
          attempts: studentQuizAttempts,
          selectedId: selectedQuizModule,
          maxScore: quiz?.maxScore || 100,
          type: "quiz" as const
        };
      case "assignment":
        const assignment = assignmentsList.find(a => a.id === selectedAssignment);
        return {
          title: assignment?.name || "Select an Assignment",
          subtitle: assignment?.moduleName || "Assignment Submissions",
          attempts: studentAssignmentAttempts,
          selectedId: selectedAssignment,
          maxScore: assignment?.maxScore || 100,
          type: "assignment" as const
        };
      case "project":
        return {
          title: courseProject.name,
          subtitle: "Final Project Submissions",
          attempts: studentProjectSubmissions,
          selectedId: courseProject.id,
          maxScore: courseProject.maxScore,
          type: "project" as const
        };
      default:
        return {
          title: "Student Overview",
          subtitle: "All Students",
          attempts: [],
          selectedId: "",
          maxScore: 100,
          type: "quiz" as const
        };
    }
  };

  const matrixData = getCurrentMatrixData();

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
                <h1 className="text-xl font-bold text-foreground">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">{courseData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {selectedStudent ? (
          <StudentDetailView
            student={selectedStudent}
            onBack={() => setSelectedStudent(null)}
          />
        ) : (
          <div className="space-y-8">
            {/* Quick Glance Selectors */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => setActiveView("quiz")} className="cursor-pointer">
                  <QuizSelector
                    type="quiz"
                    label="Quizzes"
                    placeholder="Select module..."
                    options={moduleQuizzes.map(q => ({ id: q.id, name: q.moduleName }))}
                    value={selectedQuizModule}
                    onChange={(value) => {
                      setSelectedQuizModule(value);
                      setActiveView("quiz");
                    }}
                    isActive={activeView === "quiz"}
                  />
                </div>
                <div onClick={() => setActiveView("assignment")} className="cursor-pointer">
                  <QuizSelector
                    type="assignment"
                    label="Assignments"
                    placeholder="Select assignment..."
                    options={assignmentsList.map(a => ({ id: a.id, name: `${a.moduleName}` }))}
                    value={selectedAssignment}
                    onChange={(value) => {
                      setSelectedAssignment(value);
                      setActiveView("assignment");
                    }}
                    isActive={activeView === "assignment"}
                  />
                </div>
                <div onClick={() => setActiveView("student")} className="cursor-pointer">
                  <QuizSelector
                    type="student"
                    label="Student Dashboard"
                    placeholder="Search student..."
                    options={[]}
                    value=""
                    onChange={() => {}}
                    searchMode
                    searchQuery={studentSearch}
                    onSearch={(query) => {
                      setStudentSearch(query);
                      setActiveView("student");
                    }}
                    isActive={activeView === "student"}
                  />
                </div>
                <div onClick={() => setActiveView("project")} className="cursor-pointer">
                  <QuizSelector
                    type="project"
                    label="Project"
                    placeholder={courseProject.name}
                    options={[{ id: courseProject.id, name: courseProject.name }]}
                    value={courseProject.id}
                    onChange={() => setActiveView("project")}
                    isActive={activeView === "project"}
                  />
                </div>
              </div>
            </section>

            {/* Performance Matrix */}
            {activeView !== "student" && matrixData.selectedId && (
              <PerformanceMatrix
                title={matrixData.title}
                subtitle={matrixData.subtitle}
                students={studentsData}
                attempts={matrixData.attempts}
                selectedItemId={matrixData.selectedId}
                maxScore={matrixData.maxScore}
                type={matrixData.type}
                onStudentClick={setSelectedStudent}
              />
            )}

            {/* Student List View */}
            {activeView === "student" && (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">All Students</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Click on a student to view detailed analytics
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {filteredStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"][index % 5]
                        }`}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Progress</p>
                          <p className="font-semibold text-foreground">{student.overallProgress}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-semibold text-foreground">{student.averageScore}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      No students found matching your search
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}