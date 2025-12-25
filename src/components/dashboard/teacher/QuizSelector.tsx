import { ChevronDown, FileText, ClipboardList, LayoutGrid, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface QuizSelectorProps {
  type: "moodle" | "veda" | "assignment" | "student";
  label: string;
  placeholder: string;
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  searchMode?: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
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
  searchQuery
}: QuizSelectorProps) {
  const getIcon = () => {
    switch (type) {
      case "moodle":
        return <FileText className="w-5 h-5 text-dashboard-blue" />;
      case "veda":
        return <LayoutGrid className="w-5 h-5 text-dashboard-blue" />;
      case "assignment":
        return <ClipboardList className="w-5 h-5 text-dashboard-purple" />;
      case "student":
        return <Users className="w-5 h-5 text-dashboard-blue" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "moodle":
        return "bg-orange-100";
      case "veda":
        return "bg-blue-100";
      case "assignment":
        return "bg-purple-100";
      case "student":
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
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
              <SelectTrigger className="h-8 mt-1 border-0 p-0 text-sm font-medium focus:ring-0 bg-transparent">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {!searchMode && <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </div>
    </div>
  );
}