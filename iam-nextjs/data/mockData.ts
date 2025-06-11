import { ServiceAccount, ValidationResult, EvidenceFile } from '../types';

export const getMockServiceAccount = (accountId: string): ServiceAccount => {
  return {
    account_id: accountId || 'svc-usr123',
    application: 'CustomerDataPipeline',
    owner: 'John Doe',
    last_used: '2025-01-10',
    evidence: ['JIRA-1182', 'Email Approval Screenshot', 'Application Security Configuration'],
    metadata: {
      ticket_id: 'JIRA-1182',
      last_activity_days: 125,
      account_type: 'Privileged Service Account'
    }
  };
};

export const getMockValidationResult = (): ValidationResult => {
  return {
    compliance: 'Partially Compliant',
    score: '78%',
    violations: ['Inactive > 90 days'],
    recommendation: 'Get owner reconfirmation for inactive account',
    explanation: 'The service account has not been used for 125 days. Valid email approval found, but account requires reactivation confirmation due to extended inactivity.'
  };
};

export const getEvidenceFiles = (): EvidenceFile[] => {
  return [
    {
      id: 'JIRA-1182',
      name: 'JIRA-1182',
      type: 'ticket',
      date: '2024-08-20',
      content: 'JIRA Ticket Content' // Will be rendered by EvidenceViewer
    },
    {
      id: 'Email-Approval',
      name: 'Email Approval Screenshot',
      type: 'screenshot',
      date: '2024-08-20',
      content: 'Email Approval Content' // Will be rendered by EvidenceViewer
    },
    {
      id: 'App-Config-Logs',
      name: 'Application Security Configuration',
      type: 'document',
      date: '2024-08-15',
      content: 'Application Security Configuration Content' // Will be rendered by EvidenceViewer
    }
  ];
};

// JIRA Ticket Data
export const getJiraTicketData = () => {
  return {
    ticketNumber: 'JIRA-1182',
    title: 'Service Account Request: CustomerDataPipeline',
    status: 'Resolved',
    requester: {
      name: 'John Doe',
      initials: 'JD'
    },
    approver: {
      name: 'Jane Smith (Manager)',
      initials: 'JS'
    },
    created: '2024-08-15',
    approvalDate: '2024-08-20',
    type: 'Service Account Request',
    description: 'Request for service account creation for CustomerDataPipeline application for automated data processing. This account will be used for ETL processes between core systems and data warehouse.',
    complianceNote: 'This ticket is now older than 90 days and requires renewal according to Wells Fargo IAM policy.'
  };
};

// Email Approval Data
export const getEmailApprovalData = () => {
  return {
    subject: 'Re: Service Account Approval - CustomerDataPipeline (JIRA-1182)',
    status: 'Approved',
    date: 'Tuesday, August 20, 2024 10:15 AM',
    from: {
      name: 'Jane Smith',
      email: 'jane.smith@wellsfargo.com',
      initials: 'JS'
    },
    to: [
      { name: 'John Doe', email: 'john.doe@wellsfargo.com' },
      { name: 'IAM Team', email: 'iam-team@wellsfargo.com' }
    ],
    messageBody: `Hi John,\n\nI've reviewed your service account request for the CustomerDataPipeline application (JIRA-1182) and I'm pleased to approve it.\n\n**Approval Details:**\n✅ Business justification: Valid - ETL processes for data warehouse\n✅ Security review: Completed - No elevated privileges required\n✅ Compliance check: Passed - Meets Wells Fargo IAM standards\n\n**Account Specifications:**\n• Service Account ID: svc-usr123\n• Application: CustomerDataPipeline\n• Access Level: Standard operational permissions\n• Review Schedule: Quarterly (every 90 days)\n\n**Important Reminders:**\n🔒 This account should be used exclusively for automated CustomerDataPipeline processes\n📋 Please ensure all activity is properly logged and monitored\n⏰ Account access will be reviewed quarterly as per our IAM policy\n\nPlease coordinate with the IAM team for the account provisioning. If you have any questions or need additional clarification, feel free to reach out.\n\nBest regards,\nJane Smith\nSenior Manager, Data Operations\nWells Fargo & Company`,
    complianceWarning: 'This approval is now 125+ days old and requires renewal per Wells Fargo policy.'
  };
};

// Security Configuration Data
export const getSecurityConfigData = () => {
  return {
    title: 'WELLS FARGO SECURITY CONFIGURATION AUDIT',
    subtitle: 'Service Account: svc-usr123 | CustomerDataPipeline Application',
    auditDate: '2024-08-15 14:30:22 UTC',
    events: [
      { timestamp: '2024-08-15 14:30:22', level: 'INFO', message: 'Password complexity check: PASSED' },
      { timestamp: '2024-08-15 14:30:22', level: 'INFO', message: 'Password rotation: COMPLETED' },
      { timestamp: '2024-08-15 14:30:23', level: 'INFO', message: 'Service account authentication: SUCCESS' },
      { timestamp: '2024-08-15 14:30:24', level: 'INFO', message: 'Security policy validation: PASSED' },
      { timestamp: '2024-08-10 09:15:33', level: 'WARN', message: 'Password rotation reminder sent to owner' },
      { timestamp: '2024-07-20 16:45:12', level: 'INFO', message: 'Password history cleanup: COMPLETED' }
    ],
    verification: {
      passwordComplexity: 'COMPLIANT',
      passwordRotation: 'COMPLIANT',
      securityConfig: 'VERIFIED',
      auditLogging: 'ACTIVE'
    },
    hash: 'SHA256:a8f5f167f44f4964e6c998dee827110c',
    nextCheck: '2024-08-22 14:30:22 UTC'
  };
};

export const getGenAIChatResponse = (
  message: string, 
  accountData?: ServiceAccount | null, 
  validationResult?: ValidationResult | null
): string => {
  message = message.toLowerCase();
  
  // Context-aware responses when account data is available
  if (accountData && validationResult) {
    if (message.includes('why') && (message.includes('violation') || message.includes('compliance'))) {
      const violations = validationResult.violations;
      return `Based on my analysis of account ${accountData.account_id}, here are the specific violations:\n\n${violations.map((v, i) => `${i + 1}. ${v}`).join('\n')}\n\nThe primary issue is that this account hasn't been active for ${accountData.metadata.last_activity_days} days, exceeding our 90-day compliance threshold. Additionally, the approval documentation (${accountData.metadata.ticket_id}) is stale and needs renewal.`;
    }
    
    if (message.includes('fix') || message.includes('remediate') || message.includes('solution')) {
      return `Here's a comprehensive remediation plan for ${accountData.account_id}:\n\n🔧 **Immediate Actions:**\n1. Contact owner (${accountData.owner}) to verify if account is still needed\n2. Update or create new approval ticket to replace ${accountData.metadata.ticket_id}\n3. Review current permissions and apply principle of least privilege\n\n📋 **Compliance Steps:**\n1. Document business justification for continued access\n2. Set up automated monitoring for future activity\n3. Establish regular review schedule (quarterly)\n\n⚠️ **Risk Mitigation:**\nIf account is unused, recommend immediate deactivation to reduce security exposure.`;
    }
    
    if (message.includes('risk') && message.includes('account')) {
      return `The security risks for account ${accountData.account_id} include:\n\n🚨 **High Risk Factors:**\n• Dormant account (${accountData.metadata.last_activity_days} days inactive)\n• Stale approvals increase unauthorized access risk\n• Potential for privilege creep over time\n\n🔍 **Impact Assessment:**\n• Account type: ${accountData.metadata.account_type}\n• Application: ${accountData.application}\n• Current compliance score: ${validationResult.score}\n\nRecommendation: ${validationResult.recommendation}`;
    }
  }
  
  // General IAM knowledge responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm your AI-powered IAM specialist. I have extensive knowledge about identity and access management, service account validation, compliance frameworks, and security best practices. What would you like to know?";
  }
  
  if (message.includes('what') && message.includes('iam')) {
    return "IAM (Identity and Access Management) is a critical security framework that ensures the right individuals have appropriate access to technology resources. Key components include:\n\n🔐 **Core Principles:**\n• Identity verification and authentication\n• Authorization and access control\n• Principle of least privilege\n• Regular access reviews\n\n🛡️ **For Service Accounts:**\n• Automated credential management\n• Activity monitoring and compliance\n• Regular validation and cleanup\n• Proper documentation and approval workflows";
  }
  
  // Default response for unrecognized queries
  return "I'm your AI IAM specialist with deep expertise in identity and access management. I can help you with:\n\n🔍 **Specific Topics:**\n• Service account compliance and validation\n• Security risk assessment and mitigation\n• Remediation planning and implementation\n• IAM best practices and automation\n• Regulatory compliance requirements\n\nFeel free to ask me anything about IAM validation, security policies, or compliance frameworks. I'm here to provide expert guidance!";
};

export const getChatbotResponse = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! How can I assist you with IAM validation today?";
  }
  else if (message.includes('what') && message.includes('iam')) {
    return "IAM (Identity and Access Management) is a framework for managing digital identities and their access to resources. Our validation assistant helps ensure service accounts comply with security policies.";
  }
  else if (message.includes('validation') && message.includes('process')) {
    return "The validation process involves checking service accounts against compliance rules. We verify last usage, ownership, approval documentation, and proper permissions.";
  }
  else if (message.includes('compliance') || message.includes('compliant')) {
    return "Compliance for service accounts requires: 1) Activity within 90 days, 2) Valid ownership, 3) Current approval documentation, and 4) Proper access controls. Accounts not meeting these are flagged for remediation.";
  }
  else if (message.includes('inactive')) {
    return "Inactive accounts (no usage for over 90 days) pose a security risk and should be reviewed. The owner should either confirm the account is still needed or it should be decommissioned.";
  }
  else if (message.includes('evidence')) {
    return "Evidence for service accounts includes: JIRA tickets, email approvals, access request forms, and usage logs. These are used to validate the account's purpose and authorization.";
  }
  else if (message.includes('fix') || message.includes('remediate')) {
    return "To remediate compliance issues: 1) Update approval documentation, 2) Confirm with the owner if the account is still needed, 3) Review and adjust permissions if necessary, or 4) Decommission if no longer required.";
  }
  else if (message.includes('architecture') || message.includes('how it works')) {
    return "Our system uses a Single Agent - Tool Use Pattern. The agent collects metadata, evidence, and applies compliance rules to evaluate service accounts. Check the Architecture Info panel for more details.";
  }
  else if (message.includes('check') || message.includes('validate')) {
    return "To validate an account, enter the service account ID in the main input field and click 'Validate Account'. The system will analyze it and provide compliance results and recommendations.";
  }
  else {
    return "I'm not sure I understand your question. Could you rephrase it? I can help with IAM validation processes, compliance requirements, or how to interpret results.";
  }
}; 