import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import TaskManager from './components/TaskManager';
import MoodTracker from './components/MoodTracker';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="space-y-8">
            <Chatbot />
          </div>
          
          <div className="space-y-8">
            <TaskManager />
            <MoodTracker />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;