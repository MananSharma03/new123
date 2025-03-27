import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '@/lib/chatbot';
import { MessageSquare, Send, XCircle, Bot } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user', content: string }[]>([
    { 
      sender: 'bot', 
      content: "Hi there! I'm Manan's virtual assistant. How can I help you today?\nAsk me about Manan's skills, projects, or experience." 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen && userInputRef.current) {
      userInputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen && 
        chatWindowRef.current && 
        !chatWindowRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('#chatbot-icon')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = userInput.trim();
    setMessages(prev => [...prev, { sender: 'user', content: userMessage }]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Send message to LLM API and get response
      const botResponse = await sendChatMessage(userMessage);
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        content: "I'm having trouble connecting to my knowledge base right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40" id="chatbot-container">
      {/* Chatbot Icon - New modern design */}
      <div 
        id="chatbot-icon" 
        className="w-14 h-14 bg-gradient-to-r from-[#515151] to-[#2ecc71] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
        onClick={toggleChatWindow}
        aria-label="Open chatbot"
      >
        <Bot className="w-7 h-7 text-white" />
      </div>
      
      {/* Chatbot Window */}
      <div 
        ref={chatWindowRef}
        className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chatbot Header - Enhanced with gradient */}
        <div className="bg-gradient-to-r from-[#515151] to-[#444444] text-white px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Resume Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 focus:outline-none transition-colors duration-200"
            aria-label="Close chatbot"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chatbot Messages */}
        <div className="h-80 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 custom-scrollbar" id="chatbot-messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.sender}-message ${
                message.sender === 'user' ? 'dark:bg-[#2ecc71] dark:text-white' : 'dark:bg-gray-700 dark:text-gray-100'
              }`}
            >
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={message.sender === 'bot' && i > 0 ? "text-xs text-gray-500 dark:text-gray-400 mt-1" : ""}>
                  {line}
                </p>
              ))}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message dark:bg-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chatbot Input - Enhanced with better styling */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex">
          <input 
            type="text" 
            id="user-input"
            ref={userInputRef}
            placeholder="Ask about skills, projects, experience..." 
            value={userInput}
            onChange={handleUserInput}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent"
          />
          <button 
            id="send-btn"
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-gradient-to-r from-[#515151] to-[#2ecc71] text-white px-4 py-2 rounded-r-lg hover:from-[#2ecc71] hover:to-[#27ae60] transition-all duration-300 disabled:opacity-50 disabled:hover:from-[#515151]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
