'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getGenAIChatResponse } from '../data/mockData';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  context?: {
    accountId?: string;
    riskScore?: string;
    violations?: string[];
  };
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
      text: accountData 
        ? `Hello! I'm your AI-powered IAM specialist. I can see you're working with service account "${accountData.account_id}". I have full context about this account's validation results, compliance status, and can provide expert guidance on any IAM-related questions. How can I assist you today?`
        : 'Hello! I\'m your AI-powered IAM specialist with deep expertise in identity and access management. I can help you with service account validation, compliance analysis, security best practices, and remediation strategies. What would you like to know?',
      isBot: true,
      timestamp: new Date(),
      context: accountData ? {
        accountId: accountData.account_id,
        riskScore: validationResult?.riskScore,
        violations: validationResult?.violations
      } : undefined
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update welcome message when account data changes
  useEffect(() => {
    if (accountData && messages.length === 1) {
      setMessages([{
        id: '1',
        text: `Hello! I'm your AI-powered IAM specialist. I can see you're working with service account "${accountData.account_id}". I have full context about this account's validation results, compliance status, and can provide expert guidance on any IAM-related questions. How can I assist you today?`,
        isBot: true,
        timestamp: new Date(),
        context: {
          accountId: accountData.account_id,
          riskScore: validationResult?.riskScore,
          violations: validationResult?.violations
        }
      }]);
    }
  }, [accountData, validationResult]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getEnhancedGenAIResponse = (input: string): string => {
    // Build conversation context for more intelligent responses
    const recentMessages = messages.slice(-5).map(m => m.text).join(' ');
    const contextualInput = `${recentMessages} ${input}`;
    
    // Use the advanced GenAI response function with full context
    const baseResponse = getGenAIChatResponse(input, accountData, validationResult);
    
    // Add conversation memory and enhanced context awareness
    const lowerInput = input.toLowerCase();
    
    // Enhanced contextual responses based on current validation state
    if (accountData && validationResult) {
      // Proactive suggestions based on account state
      if (lowerInput.includes('what should i do') || lowerInput.includes('next steps')) {
        const violations = validationResult.violations || [];
        if (violations.length > 0) {
          return `Based on my analysis of ${accountData.account_id}, here's your prioritized action plan:\n\n🚨 **Immediate Priority:**\n1. Contact ${accountData.owner} to verify account necessity\n2. Address the ${violations.length} compliance violation(s): ${violations.join(', ')}\n\n📋 **Next Steps:**\n3. Update approval documentation (current: ${accountData.metadata?.ticket_id})\n4. Review and optimize permissions\n5. Set up automated monitoring\n\n⏰ **Timeline:** Complete within 7 days to maintain compliance. Would you like me to elaborate on any of these steps?`;
        }
      }
      
      // Evidence-specific guidance
      if (lowerInput.includes('evidence') || lowerInput.includes('documentation')) {
        const evidenceTypes = accountData.evidence || [];
        return `For account ${accountData.account_id}, I can see the following evidence:\n\n📄 **Current Evidence:**\n${evidenceTypes.map((e: string, i: number) => `${i + 1}. ${e}`).join('\n')}\n\n🔍 **Evidence Analysis:**\n• JIRA ticket (${accountData.metadata?.ticket_id}): ${accountData.metadata?.last_activity_days > 90 ? '⚠️ Stale - needs renewal' : '✅ Current'}\n• Email approvals: Available but aging\n• Security configuration: Documented\n\n💡 **Recommendation:** ${accountData.metadata?.last_activity_days > 90 ? 'Update all evidence documents as they exceed the 90-day compliance window.' : 'Evidence is current and compliant.'}`;
      }
      
      // Risk assessment queries
      if (lowerInput.includes('risk assessment') || lowerInput.includes('security risk')) {
        return `🛡️ **Comprehensive Risk Assessment for ${accountData.account_id}:**\n\n**Current Risk Level:** ${validationResult.riskScore || 'MEDIUM'}\n\n**Risk Factors:**\n• Inactivity: ${accountData.metadata?.last_activity_days} days (${accountData.metadata?.last_activity_days > 90 ? '🔴 HIGH RISK' : '🟢 LOW RISK'})\n• Account Type: ${accountData.metadata?.account_type}\n• Application: ${accountData.application}\n\n**Security Implications:**\n• Dormant accounts increase attack surface\n• Stale approvals may not reflect current business needs\n• Potential for unauthorized access if compromised\n\n**Mitigation Strategy:**\n${validationResult.recommendation}\n\nWould you like me to create a detailed remediation plan?`;
      }
    }
    
    // Enhanced general IAM expertise
    if (lowerInput.includes('best practices') || lowerInput.includes('recommendations')) {
      return `🏆 **IAM Best Practices & Recommendations:**\n\n**Service Account Management:**\n• Implement automated lifecycle management\n• Use service-specific accounts (avoid shared accounts)\n• Regular access reviews (quarterly minimum)\n• Principle of least privilege enforcement\n\n**Compliance & Monitoring:**\n• Real-time activity monitoring\n• Automated compliance checking\n• Documentation requirements (tickets, approvals)\n• Regular security assessments\n\n**Wells Fargo Specific:**\n• 90-day activity requirement\n• Mandatory approval workflows\n• Quarterly access reviews\n• Comprehensive audit trails\n\n💡 **Pro Tip:** Implement automated alerts for accounts approaching compliance thresholds to prevent violations.`;
    }
    
    // Return the enhanced GenAI response
    return baseResponse;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
      context: accountData ? {
        accountId: accountData.account_id,
        riskScore: validationResult?.riskScore,
        violations: validationResult?.violations
      } : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev.slice(-4), inputValue.trim()]); // Keep last 5 messages for context
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time with realistic delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getEnhancedGenAIResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
        context: accountData ? {
          accountId: accountData.account_id,
          riskScore: validationResult?.riskScore,
          violations: validationResult?.violations
        } : undefined
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Slightly longer delay for AI processing
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getQuickActions = () => {
    if (!accountData || !validationResult) return [];
    
    const actions = [];
    const violations = validationResult.violations || [];
    
    if (violations.length > 0) {
      actions.push("How do I fix these violations?");
      actions.push("What's the risk assessment?");
    }
    
    actions.push("Show me best practices");
    actions.push("Create remediation plan");
    
    return actions;
  };

  return (
    <>
      {/* Enhanced Chat Button with AI indicator */}
      <button
        className="fixed-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI IAM Assistant"
      >
        <div className="position-relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          {/* AI indicator */}
          <div className="position-absolute top-0 end-0 bg-success rounded-circle" style={{ width: '8px', height: '8px', transform: 'translate(25%, -25%)' }}></div>
        </div>
      </button>

      {/* Enhanced Chat Window */}
      <div className={`chat-window ${isOpen ? 'show' : 'hide'}`}>
        {/* Enhanced Chat Header */}
        <div className="chat-header">
          <div className="d-flex align-items-center">
            <div className="bg-white bg-opacity-25 rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h6 className="mb-0 fw-bold">AI IAM Specialist</h6>
              <small className="opacity-75">
                {accountData ? `Analyzing: ${accountData.account_id}` : 'Expert IAM guidance'}
              </small>
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
                <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
                <div className={`small mt-1 ${message.isBot ? 'text-muted' : 'text-white-50'}`} style={{ minHeight: '1rem' }}>
                  {isClient ? formatTime(message.timestamp) : ''}
                  {message.context && (
                    <span className="ms-2">
                      <i className="fas fa-brain" title="AI Context Aware"></i>
                    </span>
                  )}
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
                  <span className="text-muted small">AI is analyzing and generating response...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Chat Input with Quick Actions */}
        <div className="border-top bg-white">
          {/* Context Display */}
          {accountData && (
            <div className="p-2 border-bottom bg-light">
              <div className="d-flex align-items-center justify-content-between">
                <span className="badge badge-wf-secondary small">
                  <i className="fas fa-user-cog me-1"></i>
                  Context: {accountData.account_id}
                </span>
                {validationResult && (
                  <span className={`badge small ${validationResult.violations?.length > 0 ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {validationResult.violations?.length > 0 ? `${validationResult.violations.length} Issues` : 'Compliant'}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          {getQuickActions().length > 0 && (
            <div className="p-2 border-bottom">
              <div className="small text-muted mb-1">Quick Actions:</div>
              <div className="d-flex flex-wrap gap-1">
                {getQuickActions().map((action, index) => (
                  <button
                    key={index}
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setInputValue(action)}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Ask me anything about IAM, compliance, or security..."
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
      </div>
    </>
  );
};

export default Chatbot; 