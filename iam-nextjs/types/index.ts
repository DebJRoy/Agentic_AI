export interface ServiceAccount {
  account_id: string;
  application: string;
  owner: string;
  last_used: string;
  evidence: string[];
  metadata: {
    ticket_id: string;
    last_activity_days: number;
    account_type: string;
  };
}

export interface ValidationResult {
  compliance: string;
  score: string;
  violations: string[];
  recommendation: string;
  explanation: string;
}

export interface EvidenceFile {
  id: string;
  name: string;
  type: 'ticket' | 'screenshot' | 'document';
  date: string;
  content: string;
}

export interface FeedbackData {
  positive: boolean;
  comment?: string;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  time?: string;
}

export interface JiraDetails {
  type: 'jira';
  ticketNumber: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  reporter: string;
  project: string;
  url: string;
  components: string[];
  labels: string[];
  description: string;
  watchers: string[];
  created: string;
  dueDate: string;
}

export interface EmailDetails {
  type: 'email';
  subject: string;
  messageId: string;
  recipients: {
    to: Array<{ name: string; email: string; role: string }>;
    cc: Array<{ name: string; email: string; role: string }>;
    bcc: Array<{ name: string; email: string; role: string }>;
  };
  content: {
    body: string;
    attachments: string[];
  };
  sentAt: string;
  smtpServer: string;
  priority: string;
  deliveryReceipt: boolean;
  readReceipt: boolean;
}

export type SuccessDetails = JiraDetails | EmailDetails; 