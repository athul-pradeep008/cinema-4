import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import './AIAssistant.css';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am CINE·AI Assistant. I can help you analyze scripts, breakdown scene structures, and brainstorm storylines. What are we working on today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const userText = inputVal.trim();
    
    if (userText.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i) || userText.startsWith('data:image') || userText.includes('base64')) {
      const userMsg = { id: Date.now(), sender: 'user', text: userText };
      setMessages(prev => [...prev, userMsg]);
      setInputVal('');
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I'm a text-based script analysis assistant. I cannot process image files. Please paste your screenplay text directly in the chat or use the Dashboard to upload .txt script files."
        }]);
      }, 800);
      return;
    }
    
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply = `I've noted that. As your AI director, I recommend analyzing the emotional beats of "${userText}" in the next draft.`;
      if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        reply = "Hello! Ready to make movie magic?";
      } else if (userText.toLowerCase().includes("script")) {
        reply = "I can analyze your entire script if you paste it in the Dashboard!";
      } else if (userText.toLowerCase().includes("error")) {
        reply = "If you're seeing errors, please ensure you're using text scripts (.txt files) not images. For script analysis, paste your screenplay text in the Dashboard analysis section.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply
      }]);
    }, 1200);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`ai-float-btn ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <Bot size={20} className="ai-icon" />
            <span>CINE·AI Assistant</span>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="ai-chat-body">
          {messages.map(msg => (
            <div key={msg.id} className={`ai-msg-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
              <div className={`ai-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form className="ai-chat-footer" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask AI for script advice..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" disabled={!inputVal.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
