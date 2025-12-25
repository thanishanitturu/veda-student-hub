import { ChevronDown, FileText, ClipboardList, Users, FolderKanban } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface QuizSelectorProps {
  type: "quiz" | "assignment" | "student" | "project";
  label: string;
  placeholder: string;
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  searchMode?: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  isActive?: boolean;
}

export function QuizSelector({
  type,
  label,
  placeholder,
  options,
  value,
  onChange,
  searchMode,
  onSearch,
  searchQuery,
  isActive
}: QuizSelectorProps) {
  const getIcon = () => {
    switch (type) {
      case "quiz":
        return <FileText className="w-5 h-5 text-dashboard-blue" />;
      case "assignment":
        return <ClipboardList className="w-5 h-5 text-dashboard-purple" />;
      case "student":
        return <Users className="w-5 h-5 text-dashboard-blue" />;
      case "project":
        return <FolderKanban className="w-5 h-5 text-dashboard-orange" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "quiz":
        return "bg-blue-100";
      case "assignment":
        return "bg-purple-100";
      case "student":
        return "bg-blue-500";
      case "project":
        return "bg-orange-100";
    }
  };

  return (
    <div className={`bg-card rounded-xl border p-4 hover:shadow-md transition-all ${
      isActive ? 'border-primary shadow-md ring-2 ring-primary/20' : 'border-border'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${getBgColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          {searchMode ? (
            <Input
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              className="h-8 mt-1 border-0 p-0 text-sm font-medium focus-visible:ring-0 bg-transparent"
            />
          ) : (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="h-8 mt-1 border-0 p-0 text-sm font-medium focus:ring-0 bg-transparent [&>span]:truncate">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {!searchMode && <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </div>
    </div>
  );
}