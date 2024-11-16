export interface Task {
  id: number;
  title: string;
  deadline: string;
  completed?: boolean;
}

export interface MoodEntry {
  date: string;
  mood: 'happy' | 'stressed' | 'neutral';
  tasksCompleted: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'diagnostic' | 'solution' | 'default';
  options?: string[];
}

export interface StressType {
  id: string;
  name: string;
  keywords: string[];
  symptoms: string[];
  solutions: string[];
}

export interface CopingTechnique {
  id: string;
  title: string;
  description: string;
  type: string[];
}