export const mockData = {
  tasks: [
    { id: 1, title: "Complete C project", deadline: "2024-11-20", completed: false },
    { id: 2, title: "Prepare for Standup", deadline: "2024-11-18", completed: false },
    { id: 3, title: "Review Python Concepts", deadline: "2024-11-19", completed: true },
    { id: 4, title: "Submit Portfolio Project", deadline: "2024-11-25", completed: false }
  ],

  stressTypes: {
    academic: {
      id: 'academic',
      name: 'Academic Stress',
      keywords: ['deadline', 'exam', 'assignment', 'study', 'project', 'grade', 'fail'],
      symptoms: [
        'Feeling overwhelmed by deadlines',
        'Difficulty concentrating on studies',
        'Fear of failing exams'
      ],
      solutions: [
        'Break your tasks into smaller, manageable steps',
        'Try the Pomodoro Technique: 25 minutes of focused work, followed by a 5-minute break',
        'Create a study schedule and stick to it',
        'Join a study group for mutual support'
      ]
    },
    burnout: {
      id: 'burnout',
      name: 'Burnout',
      keywords: ['tired', 'exhausted', 'overwhelmed', 'unmotivated', 'drained'],
      symptoms: [
        'Feeling constantly exhausted',
        'Lack of motivation',
        'Difficulty sleeping'
      ],
      solutions: [
        'Take regular breaks between study sessions',
        'Ensure you\'re getting enough sleep (7-9 hours)',
        'Practice mindfulness or meditation',
        'Engage in physical activity or exercise'
      ]
    },
    impostor: {
      id: 'impostor',
      name: 'Impostor Syndrome',
      keywords: ['not good enough', 'unworthy', 'fake', 'compare', 'behind'],
      symptoms: [
        'Feeling like you don\'t belong',
        'Comparing yourself to peers',
        'Doubting your abilities'
      ],
      solutions: [
        'Remember that everyone starts somewhere',
        'Focus on your progress, not perfection',
        'Celebrate your small wins',
        'Talk to mentors or peers about your feelings'
      ]
    }
  },

  copingTechniques: [
    {
      id: 'pomodoro',
      title: 'Pomodoro Technique',
      description: 'Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.',
      type: ['academic', 'burnout']
    },
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.',
      type: ['anxiety', 'stress']
    },
    {
      id: 'gratitude',
      title: 'Gratitude Journal',
      description: 'Write down three things you\'re grateful for today, no matter how small.',
      type: ['impostor', 'anxiety']
    }
  ],

  diagnosticQuestions: {
    initial: [
      "How are you feeling today?",
      "Would you like to talk about what's bothering you?",
      "Are you experiencing any specific challenges?"
    ],
    academic: [
      "Are you feeling overwhelmed by deadlines?",
      "Is there a specific subject or project that's challenging you?",
      "How are you managing your study time?"
    ],
    burnout: [
      "Have you been feeling constantly tired lately?",
      "Are you finding it hard to stay motivated?",
      "How's your sleep quality been?"
    ],
    impostor: [
      "Do you often compare yourself to your peers?",
      "Do you feel like you belong in your program?",
      "Are you doubting your abilities despite your achievements?"
    ]
  },

  getResponse(input: string): string {
    const lowercaseInput = input.toLowerCase();
    
    // Check for stress types
    for (const [type, data] of Object.entries(this.stressTypes)) {
      if (data.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        const solutions = data.solutions;
        return solutions[Math.floor(Math.random() * solutions.length)];
      }
    }

    // Default responses
    if (lowercaseInput.includes('thank')) {
      return "You're welcome! Remember, I'm always here to help. Is there anything else you'd like to discuss?";
    }
    
    if (lowercaseInput.includes('help')) {
      return "I'm here to help! Would you like to talk about academic stress, burnout, or impostor syndrome?";
    }

    return "I understand you might be going through a challenging time. Would you like to explore some coping strategies together?";
  }
};