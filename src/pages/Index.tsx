import { useState } from "react";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/teacher/TeacherDashboard";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Helmet } from "react-helmet";

const Index = () => {
  const [activeView, setActiveView] = useState<"student" | "teacher">("student");

  return (
    <>
      <Helmet>
        <title>Veda Learning Analytics | Student & Teacher Dashboard</title>
        <meta 
          name="description" 
          content="Track quiz attempts, assignment grades, and learning progress with Veda's comprehensive analytics dashboard for students and teachers." 
        />
      </Helmet>
      
      <div className="pb-20">
        {activeView === "student" ? <StudentDashboard /> : <TeacherDashboard />}
        <DashboardNav activeView={activeView} onViewChange={setActiveView} />
      </div>
    </>
  );
};

export default Index;
