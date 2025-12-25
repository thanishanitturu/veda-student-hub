import { useState, useMemo } from "react";
import { 
  studentsData, 
  courseData, 
  Student,
  moodleQuizzes,
  vedaQuizzes,
  assignmentsList,
  studentMoodleQuizAttempts,
  studentVedaQuizAttempts,
  studentAssignmentAttempts
} from "@/data/mockData";
import { QuizSelector } from "./QuizSelector";
import { PerformanceMatrix } from "./PerformanceMatrix";
import { StudentDetailView } from "./StudentDetailView";
import { GraduationCap } from "lucide-react";

type ViewType = "moodle" | "veda" | "assignment" | "student";

export function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("moodle");
  const [selectedMoodleQuiz, setSelectedMoodleQuiz] = useState(moodleQuizzes[0]?.id || "");
  const [selectedVedaQuiz, setSelectedVedaQuiz] = useState(vedaQuizzes[0]?.id || "");
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
      case "moodle":
        const moodleQuiz = moodleQuizzes.find(q => q.id === selectedMoodleQuiz);
        return {
          title: moodleQuiz?.name || "Select a Quiz",
          subtitle: "Moodle Quiz Performance",
          attempts: studentMoodleQuizAttempts,
          selectedId: selectedMoodleQuiz,
          maxScore: moodleQuiz?.maxScore || 100,
          type: "quiz" as const
        };
      case "veda":
        const vedaQuiz = vedaQuizzes.find(q => q.id === selectedVedaQuiz);
        return {
          title: vedaQuiz?.name || "Select a Module",
          subtitle: "Veda Quiz Performance",
          attempts: studentVedaQuizAttempts,
          selectedId: selectedVedaQuiz,
          maxScore: vedaQuiz?.maxScore || 100,
          type: "quiz" as const
        };
      case "assignment":
        const assignment = assignmentsList.find(a => a.id === selectedAssignment);
        return {
          title: assignment?.name || "Select an Assignment",
          subtitle: assignment?.moduleName || "Assignment Performance",
          attempts: studentAssignmentAttempts,
          selectedId: selectedAssignment,
          maxScore: assignment?.maxScore || 100,
          type: "assignment" as const
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
                <div onClick={() => setActiveView("moodle")} className="cursor-pointer">
                  <QuizSelector
                    type="moodle"
                    label="Moodle Quizzes"
                    placeholder="Select a quiz..."
                    options={moodleQuizzes.map(q => ({ id: q.id, name: q.name }))}
                    value={selectedMoodleQuiz}
                    onChange={(value) => {
                      setSelectedMoodleQuiz(value);
                      setActiveView("moodle");
                    }}
                  />
                </div>
                <div onClick={() => setActiveView("assignment")} className="cursor-pointer">
                  <QuizSelector
                    type="assignment"
                    label="Assignments"
                    placeholder="Choose an assignment..."
                    options={assignmentsList.map(a => ({ id: a.id, name: a.name }))}
                    value={selectedAssignment}
                    onChange={(value) => {
                      setSelectedAssignment(value);
                      setActiveView("assignment");
                    }}
                  />
                </div>
                <div onClick={() => setActiveView("veda")} className="cursor-pointer">
                  <QuizSelector
                    type="veda"
                    label="Veda Quizzes"
                    placeholder="View Student Matrix"
                    options={vedaQuizzes.map(q => ({ id: q.id, name: q.name }))}
                    value={selectedVedaQuiz}
                    onChange={(value) => {
                      setSelectedVedaQuiz(value);
                      setActiveView("veda");
                    }}
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