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
    name: "Carol Williams",
    email: "carol.williams@university.edu",
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
