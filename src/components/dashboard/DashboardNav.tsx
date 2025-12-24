import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  activeView: "student" | "teacher";
  onViewChange: (view: "student" | "teacher") => void;
}

export function DashboardNav({ activeView, onViewChange }: DashboardNavProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-card border shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("student")}
          className={cn(
            "rounded-full gap-2 px-4",
            activeView === "student" && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <GraduationCap className="w-4 h-4" />
          Student View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("teacher")}
          className={cn(
            "rounded-full gap-2 px-4",
            activeView === "teacher" && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <Users className="w-4 h-4" />
          Teacher View
        </Button>
      </div>
    </div>
  );
}
