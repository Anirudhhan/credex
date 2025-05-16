import React, { useState, useRef, useEffect } from 'react';
import { BsXLg, BsSend } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const mockResponses = {
  greeting: "Hello! Welcome to SoftSell. How can I help you today?",
  fallback: "I don't have information on that specific topic. For personalized assistance, please submit the contact form above or ask me about selling software licenses.",
  responses: [
    {
      keywords: ["how", "sell", "license"],
      answer: "To sell your licenses, simply fill out our valuation form at the top of the page. We'll review your submission and get back to you within 24 hours with a competitive offer. The process is fast and secure!"
    },
    {
      keywords: ["price", "worth", "value", "cost", "money", "pay", "payment"],
      answer: "We offer up to 70% of the original license value, which is typically higher than our competitors. The exact amount depends on the software type, version, and remaining subscription time. Submit your details in our form and we'll provide a free valuation within 24 hours."
    },
    {
      keywords: ["process", "steps", "how", "work"],
      answer: "Our process is simple: 1) Upload your license details through our secure form 2) Receive a competitive market valuation within 24 hours 3) Accept our offer and receive payment within 5 business days. The entire process typically takes 7 days or less."
    },
    {
      keywords: ["secure", "security", "safe", "legal"],
      answer: "Security is our top priority. All license transfers are fully compliant with software vendors' terms. We use bank-level encryption for all data, and our legal team ensures every transaction is properly documented. We've completed thousands of transfers without issues."
    },
    {
      keywords: ["software", "license", "type", "accept"],
      answer: "We accept almost all major software licenses including Microsoft (Office, Windows, Server), Adobe (Creative Cloud, Acrobat), Autodesk (AutoCAD, Revit), Oracle Database, VMware, and many others. If your software isn't listed, just ask and we'll let you know!"
    },
    {
      keywords: ["time", "long", "fast", "quick", "duration"],
      answer: "From submission to payment, our process typically takes just 5-7 business days. Valuation is provided within 24 hours, and once you accept, payment is processed within 5 business days."
    },
    {
      keywords: ["contact", "support", "help", "talk", "human"],
      answer: "You can reach our support team by filling out the contact form on this page or by emailing support@softsell.com. Our business hours are Monday-Friday, 9am-5pm EST, and we typically respond to all inquiries within 4 business hours."
    },
    {
      keywords: ["company", "about", "who"],
      answer: "SoftSell was founded in 2020 by former IT procurement specialists. We've helped over 1,000 businesses recover value from unused software licenses, processing more than $15 million in license transfers. Our team of 25 specialists has deep expertise in software licensing and compliance."
    }
  ]
};

const suggestedQuestions = [
  "How do I sell my licenses?",
  "What types of software do you accept?",
  "How much are my licenses worth?",
  "Is the process secure and legal?",
  "How long does the process take?",
  "How do I contact support?"
];

const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: mockResponses.greeting, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    const matchedResponses = mockResponses.responses.filter(item => {
      return item.keywords.some(keyword => input.includes(keyword));
    });
    
    if (matchedResponses.length > 0) {
      return matchedResponses[0].answer;
    }
    
    return mockResponses.fallback;
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    
    if (!inputText.trim()) return;
    
    const userMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        text: findBestResponse(userMessage.text),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question) => {
    setInputText(question);
    handleSendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-6 w-80 md:w-96 h-96  rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
      {/* Chat Header */}
      <div className="bg-blue-600 dark:bg-blue-800 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <FaRobot className="mr-2 text-white" />
          <h3 className="text-white font-medium">SoftSell Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className=" text-white hover:bg-blue-700 dark:hover:bg-blue-900 rounded-full p-1"
          aria-label="Close chat"
        >
          <BsXLg />
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-base-100 ">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 bg-base-100 text-white flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                message.sender === 'user' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 ml-2 mr-0' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {message.sender === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
              </div>
              <div className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white dark:bg-blue-700'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex mb-4">
            <div className="flex items-start max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                <FaRobot size={14} className="text-gray-700 dark:text-gray-300" />
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested Questions */}
      {messages.length < 3 && (
        <div className="p-2 dark:bg-gray-850 border-t border-gray-200 bg-base-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Suggested questions:</p>
          <div className="flex flex-wrap gap-1">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(question);
                  handleSendMessage();
                }}
                className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 rounded-full px-2 py-1 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-200 dark:border-gray-700 bg-base-100 flex items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 mx-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md transition-colors"
          disabled={!inputText.trim()}
        >
          <BsSend />
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;