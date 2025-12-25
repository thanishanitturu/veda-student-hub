// Mock data representing the MongoDB structure

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  correctnessScore: number;
  reasoningScore: number;
  total: number;
  maxScore: number;
}

export interface QuizAttempt {
  id: number;
  attemptNumber: number;
  title: string;
  date: string;
  totalScore: number;
  maxScore: number;
  questions: Question[];
  performancePatterns: string[];
  areasForImprovement: { title: string; description: string }[];
  overallFeedback: string;
  duration: string;
}

export interface Module {
  id: string;
  name: string;
  quizzes: QuizAttempt[];
  hasAssignment: boolean;
  assignment?: Assignment;
}

export interface Assignment {
  id: string;
  title: string;
  submittedAt: string;
  grade: number;
  maxGrade: number;
  reasoningScore: number;
  maxReasoningScore: number;
  feedback: string;
  questionText: string;
  userAnswer: string;
}

export interface Course {
  id: string;
  name: string;
  modules: Module[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  overallProgress: number;
  averageScore: number;
}

// Sample quiz questions
const sampleQuestions: Question[] = [
  {
    id: 1,
    questionText: "What is the primary function of a neural network's activation function?",
    options: [
      "A. To add linearity to the model",
      "B. To introduce non-linearity allowing complex pattern learning",
      "C. To reduce the number of parameters",
      "D. To speed up training"
    ],
    userAnswer: "B",
    correctAnswer: "B",
    correctnessScore: 5,
    reasoningScore: 5,
    total: 10,
    maxScore: 10
  },
  {
    id: 2,
    questionText: "Which optimizer is known for adaptive learning rates?",
    options: [
      "A. SGD",
      "B. Momentum",
      "C. Adam",
      "D. Batch Gradient Descent"
    ],
    userAnswer: "C",
    correctAnswer: "C",
    correctnessScore: 5,
    reasoningScore: 4,
    total: 9,
    maxScore: 10
  },
  {
    id: 3,
    questionText: "What is the vanishing gradient problem?",
    options: [
      "A. When gradients become too large",
      "B. When gradients become extremely small during backpropagation",
      "C. When the model overfits",
      "D. When the learning rate is too high"
    ],
    userAnswer: "A",
    correctAnswer: "B",
    correctnessScore: 0,
    reasoningScore: 2,
    total: 2,
    maxScore: 10
  },
  {
    id: 4,
    questionText: "What does 'epoch' mean in machine learning?",
    options: [
      "A. One pass through the entire training dataset",
      "B. One gradient update",
      "C. One batch of data",
      "D. One neuron activation"
    ],
    userAnswer: "A",
    correctAnswer: "A",
    correctnessScore: 5,
    reasoningScore: 5,
    total: 10,
    maxScore: 10
  },
  {
    id: 5,
    questionText: "Which technique helps prevent overfitting?",
    options: [
      "A. Increasing model complexity",
      "B. Dropout regularization",
      "C. Removing validation data",
      "D. Using larger batches only"
    ],
    userAnswer: "B",
    correctAnswer: "B",
    correctnessScore: 5,
    reasoningScore: 4,
    total: 9,
    maxScore: 10
  }
];

// Generate quiz attempts with variations
const generateQuizAttempts = (moduleNumber: number, attemptCount: number): QuizAttempt[] => {
  const attempts: QuizAttempt[] = [];
  
  for (let i = 1; i <= attemptCount; i++) {
    const baseScore = 60 + Math.floor(Math.random() * 30) + (i * 5); // Improving scores with attempts
    const score = Math.min(baseScore, 100);
    
    attempts.push({
      id: moduleNumber * 100 + i,
      attemptNumber: i,
      title: `Module ${moduleNumber} Quiz - Attempt ${i}`,
      date: new Date(2025, 8, 10 + i, 11, 30 + i * 5).toISOString(),
      totalScore: score,
      maxScore: 100,
      questions: sampleQuestions.map((q, idx) => ({
        ...q,
        correctnessScore: Math.random() > 0.3 ? 5 : Math.floor(Math.random() * 3),
        reasoningScore: Math.random() > 0.4 ? 4 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3),
        total: 0 // Will be calculated
      })).map(q => ({ ...q, total: q.correctnessScore + q.reasoningScore })),
      performancePatterns: [
        "Strong understanding of core concepts",
        i > 1 ? "Improvement in problem-solving approach" : "Initial assessment completed",
        score > 80 ? "Excellent grasp of material" : "Room for improvement identified"
      ],
      areasForImprovement: [
        { title: "Gradient Concepts", description: "Review backpropagation and gradient flow" },
        { title: "Optimization Techniques", description: "Study different optimizer behaviors" }
      ],
      overallFeedback: score > 80 
        ? "Excellent performance! You've demonstrated a strong understanding of the core concepts."
        : "Good effort! Focus on reviewing the highlighted areas to improve your understanding.",
      duration: `${8 + Math.floor(Math.random() * 7)} min`
    });
  }
  
  return attempts;
};

// Sample assignment
const sampleAssignment: Assignment = {
  id: "assign-1",
  title: "Deep Learning Implementation Project",
  submittedAt: "2025-09-15T14:30:00Z",
  grade: 85,
  maxGrade: 100,
  reasoningScore: 42,
  maxReasoningScore: 50,
  feedback: "Excellent implementation of the neural network architecture. Your code is well-structured and the documentation is comprehensive. Consider optimizing the training loop for better performance.",
  questionText: "Implement a multi-layer perceptron (MLP) from scratch using only NumPy. Your implementation should include forward propagation, backpropagation, and gradient descent optimization. Train your model on the provided dataset and analyze the results.",
  userAnswer: "Submitted: neural_network.py, report.pdf (2 files)"
};

// Course data
export const courseData: Course = {
  id: "course-1",
  name: "Generative AI",
  modules: [
    {
      id: "module-1",
      name: "Module 1: Introduction to AI",
      quizzes: generateQuizAttempts(1, 2),
      hasAssignment: false
    },
    {
      id: "module-2",
      name: "Module 2: Deep Learning Foundations",
      quizzes: generateQuizAttempts(2, 3),
      hasAssignment: true,
      assignment: { ...sampleAssignment, id: "assign-2" }
    },
    {
      id: "module-3",
      name: "Module 3: Neural Network Architectures",
      quizzes: generateQuizAttempts(3, 1),
      hasAssignment: true,
      assignment: { 
        ...sampleAssignment, 
        id: "assign-3",
        title: "CNN Architecture Design",
        grade: 78,
        reasoningScore: 38
      }
    },
    {
      id: "module-4",
      name: "Module 4: Transformers & Attention",
      quizzes: generateQuizAttempts(4, 2),
      hasAssignment: false
    },
    {
      id: "module-5",
      name: "Module 5: Generative Models",
      quizzes: generateQuizAttempts(5, 1),
      hasAssignment: true,
      assignment: { 
        ...sampleAssignment, 
        id: "assign-5",
        title: "GAN Implementation",
        grade: 92,
        reasoningScore: 46
      }
    },
    {
      id: "module-6",
      name: "Module 6: Large Language Models",
      quizzes: [],
      hasAssignment: false
    }
  ]
};

// Quiz structure for teacher view (module-based)
export interface ModuleQuiz {
  id: string;
  moduleId: string;
  moduleName: string;
  maxScore: number;
}

// Student quiz attempt for teacher matrix view (supports multiple attempts)
export interface StudentQuizAttempt {
  studentId: string;
  quizId: string;
  moduleId: string;
  attempted: boolean;
  attempts?: {
    attemptNumber: number;
    score: number;
    maxScore: number;
    percentage: number;
    attemptDate: string;
  }[];
  bestScore?: number;
  bestPercentage?: number;
}

// Student assignment attempt for teacher matrix view
export interface StudentAssignmentAttempt {
  studentId: string;
  assignmentId: string;
  moduleId: string;
  submitted: boolean;
  score?: number;
  maxScore?: number;
  percentage?: number;
  submittedDate?: string;
}

// Project submission for teacher view
export interface StudentProjectSubmission {
  studentId: string;
  projectId: string;
  submitted: boolean;
  score?: number;
  maxScore?: number;
  percentage?: number;
  submittedDate?: string;
}

// Course project
export interface CourseProject {
  id: string;
  name: string;
  maxScore: number;
}

// Student data for teacher dashboard
export const studentsData: Student[] = [
  {
    id: "student-1",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    enrolledCourses: ["Generative AI", "Machine Learning Basics"],
    overallProgress: 85,
    averageScore: 88
  },
  {
    id: "student-2",
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    enrolledCourses: ["Generative AI"],
    overallProgress: 72,
    averageScore: 76
  },
  {
    id: "student-3",
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    enrolledCourses: ["Generative AI", "Data Science"],
    overallProgress: 95,
    averageScore: 94
  },
  {
    id: "student-4",
    name: "David Brown",
    email: "david.brown@university.edu",
    enrolledCourses: ["Generative AI"],
    overallProgress: 60,
    averageScore: 65
  },
  {
    id: "student-5",
    name: "Eva Martinez",
    email: "eva.martinez@university.edu",
    enrolledCourses: ["Generative AI", "Deep Learning Advanced"],
    overallProgress: 78,
    averageScore: 82
  }
];

// Module-based quizzes for teacher view
export const moduleQuizzes: ModuleQuiz[] = courseData.modules
  .filter(m => m.quizzes.length > 0)
  .map(m => ({
    id: m.id,
    moduleId: m.id,
    moduleName: m.name,
    maxScore: 100
  }));

// Assignments available (module-based)
export const assignmentsList = courseData.modules
  .filter(m => m.hasAssignment && m.assignment)
  .map(m => ({
    id: m.assignment!.id,
    moduleId: m.id,
    moduleName: m.name,
    name: m.assignment!.title,
    maxScore: m.assignment!.maxGrade
  }));

// Course project (one per course)
export const courseProject: CourseProject = {
  id: "project-1",
  name: "Final Capstone Project: Build a Generative AI Application",
  maxScore: 100
};

// Student quiz attempts with multiple attempts support (1-3 attempts per quiz)
export const studentQuizAttempts: StudentQuizAttempt[] = [
  // Module 1 attempts
  { 
    studentId: "student-1", quizId: "module-1", moduleId: "module-1", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 70, maxScore: 100, percentage: 70, attemptDate: "Dec 12, 2024" },
      { attemptNumber: 2, score: 85, maxScore: 100, percentage: 85, attemptDate: "Dec 15, 2024" }
    ],
    bestScore: 85, bestPercentage: 85
  },
  { 
    studentId: "student-2", quizId: "module-1", moduleId: "module-1", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 70, maxScore: 100, percentage: 70, attemptDate: "Dec 16, 2024" }
    ],
    bestScore: 70, bestPercentage: 70
  },
  { 
    studentId: "student-3", quizId: "module-1", moduleId: "module-1", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 80, maxScore: 100, percentage: 80, attemptDate: "Dec 10, 2024" },
      { attemptNumber: 2, score: 88, maxScore: 100, percentage: 88, attemptDate: "Dec 12, 2024" },
      { attemptNumber: 3, score: 92, maxScore: 100, percentage: 92, attemptDate: "Dec 14, 2024" }
    ],
    bestScore: 92, bestPercentage: 92
  },
  { studentId: "student-4", quizId: "module-1", moduleId: "module-1", attempted: false },
  { 
    studentId: "student-5", quizId: "module-1", moduleId: "module-1", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 78, maxScore: 100, percentage: 78, attemptDate: "Dec 17, 2024" }
    ],
    bestScore: 78, bestPercentage: 78
  },
  // Module 2 attempts
  { 
    studentId: "student-1", quizId: "module-2", moduleId: "module-2", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 75, maxScore: 100, percentage: 75, attemptDate: "Dec 16, 2024" },
      { attemptNumber: 2, score: 88, maxScore: 100, percentage: 88, attemptDate: "Dec 18, 2024" }
    ],
    bestScore: 88, bestPercentage: 88
  },
  { studentId: "student-2", quizId: "module-2", moduleId: "module-2", attempted: false },
  { 
    studentId: "student-3", quizId: "module-2", moduleId: "module-2", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 90, maxScore: 100, percentage: 90, attemptDate: "Dec 15, 2024" },
      { attemptNumber: 2, score: 95, maxScore: 100, percentage: 95, attemptDate: "Dec 17, 2024" }
    ],
    bestScore: 95, bestPercentage: 95
  },
  { 
    studentId: "student-4", quizId: "module-2", moduleId: "module-2", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 55, maxScore: 100, percentage: 55, attemptDate: "Dec 18, 2024" },
      { attemptNumber: 2, score: 62, maxScore: 100, percentage: 62, attemptDate: "Dec 20, 2024" }
    ],
    bestScore: 62, bestPercentage: 62
  },
  { 
    studentId: "student-5", quizId: "module-2", moduleId: "module-2", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 80, maxScore: 100, percentage: 80, attemptDate: "Dec 19, 2024" }
    ],
    bestScore: 80, bestPercentage: 80
  },
  // Module 3 attempts
  { 
    studentId: "student-1", quizId: "module-3", moduleId: "module-3", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 82, maxScore: 100, percentage: 82, attemptDate: "Dec 20, 2024" }
    ],
    bestScore: 82, bestPercentage: 82
  },
  { 
    studentId: "student-2", quizId: "module-3", moduleId: "module-3", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 68, maxScore: 100, percentage: 68, attemptDate: "Dec 21, 2024" },
      { attemptNumber: 2, score: 75, maxScore: 100, percentage: 75, attemptDate: "Dec 22, 2024" }
    ],
    bestScore: 75, bestPercentage: 75
  },
  { 
    studentId: "student-3", quizId: "module-3", moduleId: "module-3", attempted: true,
    attempts: [
      { attemptNumber: 1, score: 91, maxScore: 100, percentage: 91, attemptDate: "Dec 19, 2024" }
    ],
    bestScore: 91, bestPercentage: 91
  },
  { studentId: "student-4", quizId: "module-3", moduleId: "module-3", attempted: false },
  { studentId: "student-5", quizId: "module-3", moduleId: "module-3", attempted: false },
];

// Student assignment submissions
export const studentAssignmentAttempts: StudentAssignmentAttempt[] = [
  { studentId: "student-1", assignmentId: "assign-2", moduleId: "module-2", submitted: true, score: 85, maxScore: 100, percentage: 85, submittedDate: "Dec 20, 2024" },
  { studentId: "student-2", assignmentId: "assign-2", moduleId: "module-2", submitted: true, score: 72, maxScore: 100, percentage: 72, submittedDate: "Dec 21, 2024" },
  { studentId: "student-3", assignmentId: "assign-2", moduleId: "module-2", submitted: true, score: 94, maxScore: 100, percentage: 94, submittedDate: "Dec 19, 2024" },
  { studentId: "student-4", assignmentId: "assign-2", moduleId: "module-2", submitted: false },
  { studentId: "student-5", assignmentId: "assign-2", moduleId: "module-2", submitted: true, score: 80, maxScore: 100, percentage: 80, submittedDate: "Dec 22, 2024" },
  { studentId: "student-1", assignmentId: "assign-3", moduleId: "module-3", submitted: true, score: 78, maxScore: 100, percentage: 78, submittedDate: "Dec 22, 2024" },
  { studentId: "student-2", assignmentId: "assign-3", moduleId: "module-3", submitted: false },
  { studentId: "student-3", assignmentId: "assign-3", moduleId: "module-3", submitted: true, score: 90, maxScore: 100, percentage: 90, submittedDate: "Dec 21, 2024" },
  { studentId: "student-4", assignmentId: "assign-3", moduleId: "module-3", submitted: true, score: 65, maxScore: 100, percentage: 65, submittedDate: "Dec 24, 2024" },
  { studentId: "student-5", assignmentId: "assign-3", moduleId: "module-3", submitted: false },
  { studentId: "student-1", assignmentId: "assign-5", moduleId: "module-5", submitted: true, score: 92, maxScore: 100, percentage: 92, submittedDate: "Dec 23, 2024" },
  { studentId: "student-2", assignmentId: "assign-5", moduleId: "module-5", submitted: false },
  { studentId: "student-3", assignmentId: "assign-5", moduleId: "module-5", submitted: true, score: 96, maxScore: 100, percentage: 96, submittedDate: "Dec 22, 2024" },
  { studentId: "student-4", assignmentId: "assign-5", moduleId: "module-5", submitted: false },
  { studentId: "student-5", assignmentId: "assign-5", moduleId: "module-5", submitted: true, score: 88, maxScore: 100, percentage: 88, submittedDate: "Dec 24, 2024" },
];

// Student project submissions
export const studentProjectSubmissions: StudentProjectSubmission[] = [
  { studentId: "student-1", projectId: "project-1", submitted: true, score: 90, maxScore: 100, percentage: 90, submittedDate: "Dec 24, 2024" },
  { studentId: "student-2", projectId: "project-1", submitted: true, score: 78, maxScore: 100, percentage: 78, submittedDate: "Dec 24, 2024" },
  { studentId: "student-3", projectId: "project-1", submitted: true, score: 95, maxScore: 100, percentage: 95, submittedDate: "Dec 23, 2024" },
  { studentId: "student-4", projectId: "project-1", submitted: false },
  { studentId: "student-5", projectId: "project-1", submitted: false },
];

// Aggregated stats
export const getStudentStats = () => {
  const allQuizzes = courseData.modules.flatMap(m => m.quizzes);
  const allAssignments = courseData.modules.filter(m => m.hasAssignment && m.assignment).map(m => m.assignment!);
  
  const totalQuizzes = allQuizzes.length;
  const avgQuizScore = totalQuizzes > 0 
    ? Math.round(allQuizzes.reduce((sum, q) => sum + q.totalScore, 0) / totalQuizzes)
    : 0;
  
  const totalAssignments = allAssignments.length;
  const avgAssignmentScore = totalAssignments > 0
    ? Math.round(allAssignments.reduce((sum, a) => sum + a.grade, 0) / totalAssignments)
    : 0;

  const modulesCompleted = courseData.modules.filter(m => m.quizzes.length > 0).length;
  const totalModules = courseData.modules.length;

  return {
    totalQuizzes,
    avgQuizScore,
    totalAssignments,
    avgAssignmentScore,
    modulesCompleted,
    totalModules,
    completionRate: Math.round((modulesCompleted / totalModules) * 100)
  };
};
