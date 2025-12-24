import { useState } from "react";
import { studentsData, courseData, Student } from "@/data/mockData";
import { StatCard } from "../StatCard";
import { StudentCard } from "./StudentCard";
import { StudentDetailView } from "./StudentDetailView";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Target,
  Search,
  GraduationCap
} from "lucide-react";

export function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate class statistics
  const avgClassScore = Math.round(
    studentsData.reduce((sum, s) => sum + s.averageScore, 0) / studentsData.length
  );
  const avgProgress = Math.round(
    studentsData.reduce((sum, s) => sum + s.overallProgress, 0) / studentsData.length
  );
  const atRiskCount = studentsData.filter(s => s.averageScore < 70).length;

  // Filter students
  const filteredStudents = studentsData.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {/* Class Overview Stats */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Class Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Students"
                  value={studentsData.length}
                  subtitle="Enrolled in course"
                  icon={<Users className="w-5 h-5" />}
                  variant="primary"
                />
                <StatCard
                  title="Class Average Score"
                  value={`${avgClassScore}%`}
                  subtitle="Across all quizzes"
                  icon={<TrendingUp className="w-5 h-5" />}
                  trend={{ value: 3, isPositive: true }}
                  variant="success"
                />
                <StatCard
                  title="Average Progress"
                  value={`${avgProgress}%`}
                  subtitle="Course completion"
                  icon={<Target className="w-5 h-5" />}
                  variant="primary"
                />
                <StatCard
                  title="At-Risk Students"
                  value={atRiskCount}
                  subtitle="Score below 70%"
                  icon={<BookOpen className="w-5 h-5" />}
                  variant="warning"
                />
              </div>
            </section>

            {/* Student List */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Students</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredStudents.map((student, index) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onClick={() => setSelectedStudent(student)}
                    index={index}
                  />
                ))}
              </div>

              {filteredStudents.length === 0 && (
                <div className="p-8 rounded-xl border border-dashed bg-muted/30 text-center">
                  <p className="text-muted-foreground">No students found matching your search</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
