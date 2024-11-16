import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Smile, Frown, Meh, Brain } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockData } from '../data/mockData';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    text: "Hi! I'm your wellness assistant. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date().toISOString(),
    type: 'diagnostic',
    options: ['I\'m feeling overwhelmed', 'I\'m doubting myself', 'I need help with time management']
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = mockData.getResponse(input);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'solution'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);

      // If the response was a solution, offer follow-up
      if (botMessage.type === 'solution') {
        setTimeout(() => {
          const followUpMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            text: "Did you find this helpful? Would you like to explore more coping strategies?",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            type: 'diagnostic',
            options: ['Yes, tell me more', 'I\'d like to try something else', 'This was helpful, thanks!']
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1000);
      }
    }, 1500);
  };

  const quickResponses = [
    { 
      text: "I'm feeling overwhelmed",
      icon: <Frown className="h-4 w-4" />,
      type: 'academic'
    },
    { 
      text: "I need motivation",
      icon: <Meh className="h-4 w-4" />,
      type: 'burnout'
    },
    { 
      text: "I'm doubting myself",
      icon: <Brain className="h-4 w-4" />,
      type: 'impostor'
    }
  ];

  return (
    <div className="glass-effect rounded-xl flex flex-col h-[600px]">
      <div className="p-4 border-b border-dark-700 flex items-center space-x-2">
        <div className="relative">
          <Bot className="h-6 w-6 text-primary-400" />
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Wellness Assistant</h2>
          <p className="text-xs text-gray-400">Here to support your mental well-being</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id}>
            <div
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-br-none'
                    : 'glass-effect text-gray-100 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
            {message.options && (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(option);
                      setTimeout(() => handleSend({ preventDefault: () => {} } as React.FormEvent), 0);
                    }}
                    className="px-3 py-1.5 text-sm glass-effect rounded-full hover:bg-dark-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-dark-700">
        <div className="flex gap-2 mb-4">
          {quickResponses.map((response, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(response.text);
                setTimeout(() => handleSend({ preventDefault: () => {} } as React.FormEvent), 0);
              }}
              className="flex items-center space-x-2 px-3 py-1.5 glass-effect rounded-full text-sm hover:bg-dark-700 transition-colors"
            >
              {response.icon}
              <span>{response.text}</span>
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSend}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input-dark"
            />
            <button
              type="submit"
              className="btn-primary"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}