import { Student } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "../ProgressRing";
import { ChevronRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  index: number;
}

export function StudentCard({ student, onClick, index }: StudentCardProps) {
  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const scoreVariant = student.averageScore >= 85 
    ? "success" 
    : student.averageScore >= 70 
      ? "primary" 
      : "warning";

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl border bg-card cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20 group animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {student.name}
          </h4>
          <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 shrink-0" />
            {student.email}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center hidden sm:block">
            <div className="text-sm font-semibold text-foreground">{student.overallProgress}%</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
          
          <ProgressRing 
            value={student.averageScore} 
            size={50} 
            strokeWidth={5}
            variant={scoreVariant}
          />

          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
        {student.enrolledCourses.map((course, idx) => (
          <Badge 
            key={idx} 
            variant="secondary" 
            className={cn(
              "text-xs",
              idx === 0 && "bg-primary/10 text-primary border-primary/20"
            )}
          >
            {course}
          </Badge>
        ))}
      </div>
    </div>
  );
}
