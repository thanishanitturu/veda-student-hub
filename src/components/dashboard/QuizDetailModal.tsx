import { QuizAttempt, Question } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressRing } from "./ProgressRing";
import { CheckCircle2, XCircle, AlertCircle, Clock, Target, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizDetailModalProps {
  quiz: QuizAttempt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function QuestionCard({ question, index }: { question: Question; index: number }) {
  const isCorrect = question.userAnswer === question.correctAnswer;
  const scorePercent = (question.total / question.maxScore) * 100;

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      isCorrect ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-1.5 rounded-full mt-0.5",
          isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-medium text-foreground">
              Q{index + 1}. {question.questionText}
            </p>
            <Badge 
              variant="outline" 
              className={cn(
                "shrink-0",
                isCorrect ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"
              )}
            >
              {question.total}/{question.maxScore}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {question.options.map((opt, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-2 rounded-md border text-xs",
                  opt.startsWith(question.correctAnswer) && "bg-success/10 border-success/30 text-success",
                  opt.startsWith(question.userAnswer) && question.userAnswer !== question.correctAnswer && "bg-destructive/10 border-destructive/30 text-destructive",
                  !opt.startsWith(question.correctAnswer) && !opt.startsWith(question.userAnswer) && "bg-muted/50 border-transparent text-muted-foreground"
                )}
              >
                {opt}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <span>Correctness: <strong className="text-foreground">{question.correctnessScore}/5</strong></span>
            <span>Reasoning: <strong className="text-foreground">{question.reasoningScore}/5</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuizDetailModal({ quiz, open, onOpenChange }: QuizDetailModalProps) {
  if (!quiz) return null;

  const correctAnswers = quiz.questions.filter(q => q.userAnswer === q.correctAnswer).length;
  const avgReasoningScore = Math.round(
    quiz.questions.reduce((sum, q) => sum + q.reasoningScore, 0) / quiz.questions.length * 20
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-3">
            <ProgressRing value={quiz.totalScore} size={48} strokeWidth={5} />
            <div>
              <span className="text-xl">{quiz.title}</span>
              <p className="text-sm font-normal text-muted-foreground">
                {new Date(quiz.date).toLocaleString()}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1">
          <div className="px-6 border-b">
            <TabsList className="bg-transparent h-12 p-0 gap-4">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="questions"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
              >
                Questions ({quiz.questions.length})
              </TabsTrigger>
              <TabsTrigger 
                value="feedback"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
              >
                AI Feedback
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[60vh]">
            <TabsContent value="overview" className="p-6 m-0 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Target className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{correctAnswers}/{quiz.questions.length}</div>
                  <div className="text-xs text-muted-foreground">Correct Answers</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{quiz.duration}</div>
                  <div className="text-xs text-muted-foreground">Time Spent</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Lightbulb className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{avgReasoningScore}%</div>
                  <div className="text-xs text-muted-foreground">Reasoning Score</div>
                </div>
              </div>

              {/* Performance Patterns */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Performance Patterns
                </h4>
                <ul className="space-y-2">
                  {quiz.performancePatterns.map((pattern, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {quiz.areasForImprovement.map((area, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <h5 className="font-medium text-sm text-foreground">{area.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="p-6 m-0 space-y-4">
              {quiz.questions.map((question, index) => (
                <QuestionCard key={question.id} question={question} index={index} />
              ))}
            </TabsContent>

            <TabsContent value="feedback" className="p-6 m-0">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  AI Analysis
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {quiz.overallFeedback}
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
