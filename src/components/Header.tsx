import React from 'react';
import { Brain, Bell, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary-400" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent-500 rounded-full animate-pulse-slow" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              ALX Wellness
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-300" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}