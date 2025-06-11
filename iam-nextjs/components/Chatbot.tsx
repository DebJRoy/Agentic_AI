'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  accountData?: any;
  validationResult?: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ accountData, validationResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your IAM validation assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextualResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (accountData && validationResult) {
      if (lowerInput.includes('account') || lowerInput.includes('service')) {
        return `I can see you're working with service account "${accountData.accountId}". The validation shows a ${validationResult.riskScore} risk score. Would you like me to explain any specific findings?`;
      }
      
      if (lowerInput.includes('violation') || lowerInput.includes('issue')) {
        const violations = validationResult.violations || [];
        if (violations.length > 0) {
          return `I found ${violations.length} compliance violations for this account. The main issues are: ${violations.slice(0, 2).map((v: any) => v.type).join(', ')}. Would you like details on how to resolve these?`;
        }
        return 'Great news! No compliance violations were found for this account.';
      }
      
      if (lowerInput.includes('risk') || lowerInput.includes('score')) {
        return `The current risk score is ${validationResult.riskScore}. This is based on factors like permissions, last activity, and compliance status. ${validationResult.riskScore === 'HIGH' ? 'I recommend immediate attention to the flagged issues.' : 'The account appears to be in good standing.'}`;
      }
    }
    
    // Default responses
    if (lowerInput.includes('help')) {
      return 'I can help you with IAM validation, explain compliance issues, provide guidance on fixing violations, and answer questions about service account security best practices.';
    }
    
    if (lowerInput.includes('compliance')) {
      return 'Wells Fargo compliance requires service accounts to follow naming conventions, have proper access controls, regular access reviews, and maintain audit trails. What specific compliance topic would you like to know about?';
    }
    
    if (lowerInput.includes('permission') || lowerInput.includes('access')) {
      return 'Service account permissions should follow the principle of least privilege. Regular access reviews help ensure accounts only have necessary permissions. Would you like me to explain current permission analysis?';
    }
    
    return 'I understand you\'re asking about IAM validation. Could you be more specific? I can help with compliance issues, risk assessment, violations, or general security questions.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getContextualResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    // Use a consistent 24-hour format to avoid hydration mismatches
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="fixed-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Chat Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'show' : 'hide'}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <div className="d-flex align-items-center">
            <div className="bg-white bg-opacity-25 rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h6 className="mb-0 fw-bold">IAM Assistant</h6>
              <small className="opacity-75">Always here to help</small>
            </div>
          </div>
          <button
            className="btn btn-sm text-white p-0"
            onClick={() => setIsOpen(false)}
            style={{ lineHeight: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.isBot ? 'bot' : 'user'}`}>
              <div className="chat-message-content">
                {message.text}
                <div className={`small mt-1 ${message.isBot ? 'text-muted' : 'text-white-50'}`} style={{ minHeight: '1rem' }}>
                  {isClient ? formatTime(message.timestamp) : ''}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot">
              <div className="chat-message-content">
                <div className="d-flex align-items-center">
                  <div className="spinner-grow spinner-grow-sm me-2" style={{ width: '0.75rem', height: '0.75rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="text-muted small">Assistant is typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-top p-3 bg-white">
          {accountData && (
            <div className="mb-2">
              <span className="badge badge-wf-secondary small">
                Context: {accountData.accountId}
              </span>
            </div>
          )}
          
          <div className="input-group">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Ask me about IAM validation..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              style={{ backgroundColor: '#f8f9fa' }}
            />
            <button
              className="btn btn-wf-primary"
              type="button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot; 