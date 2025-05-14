// Mock data for the English learning platform

// Courses
export const courses = [
  {
    id: 1,
    title: "English for Beginners",
    description: "Learn foundational English vocabulary, grammar, and conversation skills.",
    level: "Beginner",
    rating: 4.8,
    totalLessons: 20,
    progress: 25,
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Basic Vocabulary", "Simple Grammar", "Daily Conversations", "Pronunciation Basics"],
    duration: "8 weeks"
  },
  {
    id: 2,
    title: "Business English",
    description: "Master professional vocabulary and communication for workplace success.",
    level: "Intermediate",
    rating: 4.9,
    totalLessons: 15,
    progress: 10,
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Professional Vocabulary", "Business Writing", "Meeting Skills", "Presentation Techniques"],
    duration: "6 weeks"
  },
  {
    id: 3,
    title: "Public Speaking",
    description: "Develop confidence and fluency for presentations and public speaking.",
    level: "Advanced",
    rating: 4.7,
    totalLessons: 12,
    progress: 0,
    imageUrl: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Speech Structure", "Vocal Techniques", "Body Language", "Audience Engagement"],
    duration: "5 weeks"
  },
  {
    id: 4,
    title: "IELTS Preparation",
    description: "Comprehensive preparation for all sections of the IELTS exam.",
    level: "Intermediate",
    rating: 4.6,
    totalLessons: 18,
    progress: 0,
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Reading Strategies", "Writing Tasks", "Listening Skills", "Speaking Practice"],
    duration: "10 weeks"
  },
  {
    id: 5,
    title: "Everyday Conversations",
    description: "Practice everyday English conversations for travel, shopping, and social settings.",
    level: "Beginner",
    rating: 4.5,
    totalLessons: 14,
    progress: 50,
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Travel English", "Shopping", "Social Interactions", "Restaurant Conversations"],
    duration: "6 weeks"
  },
  {
    id: 6,
    title: "Academic Writing",
    description: "Learn to write essays, reports, and research papers in academic English.",
    level: "Advanced",
    rating: 4.8,
    totalLessons: 16,
    progress: 75,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    topics: ["Essay Structure", "Academic Vocabulary", "Research Methods", "Citation Techniques"],
    duration: "8 weeks"
  }
];

// Lessons by course
export const lessons = {
  1: [
    { 
      id: 101, 
      title: "Introduction to English", 
      description: "An overview of the English language and what you'll learn in this course.",
      videoUrl: "https://example.com/vid1",
      duration: "15 min",
      completed: true
    },
    { 
      id: 102, 
      title: "Basic Greetings", 
      description: "Learn common greetings and introductions in English.",
      videoUrl: "https://example.com/vid2",
      duration: "20 min",
      completed: true
    },
    { 
      id: 103, 
      title: "Numbers and Counting", 
      description: "Master numbers 1-100 and basic counting in English.",
      videoUrl: "https://example.com/vid3",
      duration: "25 min",
      completed: false
    },
    { 
      id: 104, 
      title: "Days and Months", 
      description: "Learn days of the week, months, and talking about dates.",
      videoUrl: "https://example.com/vid4",
      duration: "18 min",
      completed: false
    },
    { 
      id: 105, 
      title: "Basic Questions", 
      description: "How to ask and answer simple questions in English.",
      videoUrl: "https://example.com/vid5",
      duration: "22 min",
      completed: false
    }
  ],
  2: [
    { 
      id: 201, 
      title: "Business Email Writing", 
      description: "Learn how to write effective professional emails.",
      videoUrl: "https://example.com/vid6",
      duration: "30 min",
      completed: true
    },
    { 
      id: 202, 
      title: "Meeting Vocabulary", 
      description: "Essential vocabulary for business meetings.",
      videoUrl: "https://example.com/vid7",
      duration: "25 min",
      completed: false
    },
    { 
      id: 203, 
      title: "Negotiation Skills", 
      description: "Language and strategies for successful negotiations.",
      videoUrl: "https://example.com/vid8",
      duration: "35 min",
      completed: false
    }
  ],
  3: [
    { 
      id: 301, 
      title: "Speech Structure", 
      description: "How to structure a compelling speech.",
      videoUrl: "https://example.com/vid9",
      duration: "28 min",
      completed: false
    },
    { 
      id: 302, 
      title: "Voice Projection", 
      description: "Techniques for effective voice projection and clarity.",
      videoUrl: "https://example.com/vid10",
      duration: "22 min",
      completed: false
    }
  ]
};

// Tests
export const tests = [
  {
    id: 1,
    title: "Beginner Level Test 1",
    description: "Test your knowledge of basic vocabulary and grammar.",
    courseId: 1,
    questions: [
      {
        id: 101,
        question: "What is the correct greeting for morning?",
        options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
        correctAnswer: "Good morning"
      },
      {
        id: 102,
        question: "Which is the correct plural form of 'child'?",
        options: ["childs", "childes", "children", "child"],
        correctAnswer: "children"
      },
      {
        id: 103,
        question: "What is the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eating"],
        correctAnswer: "ate"
      }
    ],
    duration: "15 min"
  },
  {
    id: 2,
    title: "Business English Assessment",
    description: "Test your business English vocabulary and communication skills.",
    courseId: 2,
    questions: [
      {
        id: 201,
        question: "Which phrase is best for beginning a formal business email?",
        options: ["Hey there,", "Dear Sir/Madam,", "Hi friend,", "What's up?"],
        correctAnswer: "Dear Sir/Madam,"
      },
      {
        id: 202,
        question: "What does 'ROI' stand for in business?",
        options: ["Return On Investment", "Rate Of Inflation", "Right Of Information", "Review Of Income"],
        correctAnswer: "Return On Investment"
      }
    ],
    duration: "20 min"
  }
];

// Writing practice
export const writingPractices = [
  {
    id: 1,
    title: "Email Writing",
    description: "Practice writing formal and informal emails.",
    level: "Intermediate",
    duration: "30 min",
    instructions: "Write a formal email to a company inquiring about their services."
  },
  {
    id: 2,
    title: "Essay Structure",
    description: "Learn to write a well-structured essay with introduction, body, and conclusion.",
    level: "Advanced",
    duration: "45 min",
    instructions: "Write a 500-word essay on the importance of learning a second language."
  },
  {
    id: 3,
    title: "Story Writing",
    description: "Practice creative writing by crafting a short story.",
    level: "Beginner",
    duration: "25 min",
    instructions: "Write a short story about a memorable day in your life."
  }
];

// Speaking practice
export const speakingPractices = [
  {
    id: 1,
    title: "Self Introduction",
    description: "Practice introducing yourself in a professional setting.",
    level: "Beginner",
    duration: "10 min",
    audioSample: "https://example.com/audio1"
  },
  {
    id: 2,
    title: "Describing Images",
    description: "Practice describing photos and images in detail.",
    level: "Intermediate",
    duration: "15 min",
    audioSample: "https://example.com/audio2"
  },
  {
    id: 3,
    title: "Debate Practice",
    description: "Engage in a structured debate on a given topic.",
    level: "Advanced",
    duration: "20 min",
    audioSample: "https://example.com/audio3"
  }
];

// User learning history
export const userLearningHistory = [
  {
    id: 1,
    courseId: 1,
    lessonId: 101,
    completed: true,
    lastAccessed: "2023-09-15T10:30:00"
  },
  {
    id: 2,
    courseId: 1,
    lessonId: 102,
    completed: true,
    lastAccessed: "2023-09-16T14:45:00"
  },
  {
    id: 3,
    courseId: 2,
    lessonId: 201,
    completed: true,
    lastAccessed: "2023-09-17T09:15:00"
  },
  {
    id: 4,
    courseId: 5,
    lessonId: null, // Course accessed but no specific lesson
    completed: false,
    lastAccessed: "2023-09-18T16:20:00"
  }
];

// Admin dashboard statistics
export const adminStats = {
  totalUsers: 2451,
  activeUsers: 1876,
  activeCourses: 48,
  lessonsCompleted: 18267,
  averageRating: 4.8,
  userGrowth: 12, // percent from last month
  coursesGrowth: 5, // percent from last month
  lessonsGrowth: 8, // percent from last month
  ratingGrowth: 0.2 // points from last month
};

// Recent activities for admin dashboard
export const recentActivities = [
  {
    id: 1,
    type: "user_registration",
    description: "New user registered",
    details: "Sarah Johnson joined the platform",
    time: "Today, 10:30 AM",
    icon: "person-plus"
  },
  {
    id: 2,
    type: "course_published",
    description: "New course published",
    details: "IELTS Preparation Course is now live",
    time: "Yesterday, 3:45 PM",
    icon: "book-half"
  },
  {
    id: 3,
    type: "course_review",
    description: "New course review",
    details: "5-star review for Business English",
    time: "Yesterday, 1:24 PM",
    icon: "star-fill"
  },
  {
    id: 4,
    type: "content_reported",
    description: "Content reported",
    details: "Issue reported in Advanced Grammar lesson",
    time: "Sep 21, 8:12 AM",
    icon: "flag"
  }
];

// User list for admin
export const users = [
  {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    joinDate: "2023-05-12",
    coursesEnrolled: 3,
    lessonsCompleted: 24,
    status: "active"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    joinDate: "2023-06-23",
    coursesEnrolled: 2,
    lessonsCompleted: 15,
    status: "active"
  },
  {
    id: 3,
    fullName: "Robert Johnson",
    username: "robertj",
    email: "robert.j@example.com",
    joinDate: "2023-04-03",
    coursesEnrolled: 5,
    lessonsCompleted: 42,
    status: "active"
  },
  {
    id: 4,
    fullName: "Emily Davis",
    username: "emilyd",
    email: "emily.d@example.com",
    joinDate: "2023-07-18",
    coursesEnrolled: 1,
    lessonsCompleted: 7,
    status: "inactive"
  },
  {
    id: 5,
    fullName: "Michael Wilson",
    username: "michaelw",
    email: "michael.w@example.com",
    joinDate: "2023-08-05",
    coursesEnrolled: 2,
    lessonsCompleted: 10,
    status: "active"
  }
];
