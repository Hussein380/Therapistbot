import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Meh, Frown } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const moodData = [
  { date: '2024-03-10', mood: 3, tasks: 5 },
  { date: '2024-03-11', mood: 4, tasks: 3 },
  { date: '2024-03-12', mood: 2, tasks: 2 },
  { date: '2024-03-13', mood: 5, tasks: 4 },
  { date: '2024-03-14', mood: 4, tasks: 6 }
];

const MoodIcon = ({ mood }: { mood: number }) => {
  if (mood >= 4) return <Smile className="h-6 w-6 text-green-400" />;
  if (mood >= 3) return <Meh className="h-6 w-6 text-yellow-400" />;
  return <Frown className="h-6 w-6 text-red-400" />;
};

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = React.useState<number>(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Mood Tracker</h2>
        <p className="text-sm text-gray-400 mt-1">Track your daily emotional well-being</p>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-3">How are you feeling today?</p>
        <div className="flex justify-between items-center max-w-xs">
          {[1, 2, 3, 4, 5].map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-3 rounded-lg transition-all ${
                selectedMood === mood
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600'
                  : 'hover:bg-dark-700'
              }`}
            >
              <MoodIcon mood={mood} />
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              stroke="#4B5563"
            />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ fill: '#0EA5E9', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#C026D3"
              strokeWidth={2}
              dot={{ fill: '#C026D3', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary-500 mr-2" />
          Mood Level
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-accent-500 mr-2" />
          Tasks Completed
        </div>
      </div>
    </motion.div>
  );
}