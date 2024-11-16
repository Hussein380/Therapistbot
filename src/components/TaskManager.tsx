import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Plus } from 'lucide-react';
import { Task } from '../types';
import { mockData } from '../data/mockData';

export default function TaskManager() {
  const [tasks, setTasks] = React.useState<Task[]>(mockData.tasks);
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ title: '', deadline: '' });

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      deadline: newTask.deadline,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', deadline: '' });
    setShowAddTask(false);
  };

  const isOverdue = (deadline: string) => new Date(deadline) < new Date();

  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">Tasks</h2>
            <p className="text-sm text-gray-400 mt-1">
              {tasks.filter(t => !t.completed).length} tasks remaining
            </p>
          </div>
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {showAddTask && (
          <form onSubmit={addTask} className="mb-6 p-4 glass-effect rounded-lg">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="input-dark"
              />
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                className="input-dark"
              />
              <button type="submit" className="btn-primary w-full">
                Add Task
              </button>
            </div>
          </form>
        )}
        
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg transition-all ${
                task.completed 
                  ? 'glass-effect opacity-60'
                  : isOverdue(task.deadline)
                    ? 'bg-red-500/10 border border-red-500/20'
                    : 'glass-effect'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="focus:outline-none group"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-primary-400" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    )}
                  </button>
                  <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-100'}>
                    {task.title}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  {isOverdue(task.deadline) && !task.completed ? (
                    <div className="flex items-center text-red-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>Overdue</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}