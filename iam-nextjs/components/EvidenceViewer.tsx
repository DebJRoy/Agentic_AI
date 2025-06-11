'use client';

import React, { useState } from 'react';
import { EvidenceFile } from '../types';
import { getJiraTicketData, getEmailApprovalData, getSecurityConfigData } from '../data/mockData';

interface EvidenceViewerProps {
  evidenceFiles: EvidenceFile[];
  onModalClose: () => void;
  initiallyOpen: boolean;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ 
  evidenceFiles, 
  onModalClose,
  initiallyOpen
}) => {
  const [selectedFile, setSelectedFile] = useState<EvidenceFile>(evidenceFiles[0] || null);
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'ticket':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>;
      case 'screenshot':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-success">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>;
      case 'document':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-warning">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
        </svg>;
      default:
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-info">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
        </svg>;
    }
  };

  // JIRA Ticket Component
  const JIRATicketContent = () => {
    const jiraData = getJiraTicketData();
    return (
      <div className="bg-white p-4 border border-secondary rounded shadow-sm">
        <div className="d-flex align-items-center mb-4 border-bottom pb-3">
          <span className="badge bg-primary me-3 fs-6">{jiraData.ticketNumber}</span>
          <h4 className="fw-bold text-dark mb-0">{jiraData.title}</h4>
        </div>
        
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="mb-3">
              <p className="text-muted small mb-1">Status</p>
              <span className="badge bg-success">{jiraData.status}</span>
            </div>
            
            <div className="mb-3">
              <p className="text-muted small mb-1">Requester</p>
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '28px', height: '28px', fontSize: '12px'}}>
                  {jiraData.requester.initials}
                </div>
                <span className="text-dark">{jiraData.requester.name}</span>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-muted small mb-1">Approver</p>
              <div className="d-flex align-items-center">
                <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '28px', height: '28px', fontSize: '12px'}}>
                  {jiraData.approver.initials}
                </div>
                <span className="text-dark">{jiraData.approver.name}</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="mb-3">
              <p className="text-muted small mb-1">Created</p>
              <p className="text-dark mb-0">{jiraData.created}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-muted small mb-1">Approval Date</p>
              <p className="text-dark mb-0">{jiraData.approvalDate}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-muted small mb-1">Type</p>
              <p className="text-dark mb-0">{jiraData.type}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-muted small mb-1">Description</p>
          <div className="bg-light p-3 rounded border">
            <p className="text-dark mb-0">{jiraData.description}</p>
          </div>
        </div>
        
        <div className="alert alert-warning d-flex align-items-start">
          <svg className="text-warning me-2 mt-1 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <div>
            <p className="fw-semibold text-warning-emphasis mb-1">Compliance Note</p>
            <p className="small text-warning-emphasis mb-0">{jiraData.complianceNote}</p>
          </div>
        </div>
      </div>
    );
  };

  // Email Content Component  
  const EmailApprovalContent = () => {
    const emailData = getEmailApprovalData();
    return (
      <div className="bg-light p-0 shadow border border-secondary rounded overflow-hidden">
        {/* Outlook Header Bar */}
        <div className="bg-primary text-white px-3 py-2 d-flex align-items-center justify-content-between small">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <div className="bg-white text-primary rounded-1 d-flex align-items-center justify-content-center me-2" style={{width: '16px', height: '16px', fontSize: '10px'}}>
                O
              </div>
              <span className="fw-medium">Outlook</span>
            </div>
            <span className="text-primary-emphasis">|</span>
            <span className="ms-2">Mail</span>
          </div>
        </div>

        {/* Outlook Ribbon */}
        <div className="bg-light border-bottom px-3 py-1">
          <div className="d-flex align-items-center small">
            <span className="text-primary fw-medium me-3">Home</span>
            <span className="text-muted me-3">Send / Receive</span>
            <span className="text-muted">Folder</span>
          </div>
        </div>

        {/* Email Content */}
        <div className="bg-white">
          {/* Email Header */}
          <div className="border-bottom p-3">
            <div className="d-flex align-items-start justify-content-between mb-3">
              <div className="flex-grow-1">
                <h5 className="fw-semibold text-dark mb-1">{emailData.subject}</h5>
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-success me-2">📧 {emailData.status}</span>
                  <span className="text-muted small">{emailData.date}</span>
                </div>
              </div>
            </div>

            {/* Sender/Recipient Info */}
            <div className="mb-2">
              <div className="d-flex align-items-center mb-2">
                <span className="text-muted small me-3" style={{width: '60px'}}>From:</span>
                <div className="d-flex align-items-center">
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px', fontSize: '12px'}}>
                    {emailData.from.initials}
                  </div>
                  <div>
                    <span className="fw-medium text-dark">{emailData.from.name}</span>
                    <span className="text-muted ms-1">&lt;{emailData.from.email}&gt;</span>
                  </div>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <span className="text-muted small me-3" style={{width: '60px'}}>To:</span>
                <div className="text-dark">
                  {emailData.to.map((recipient, index) => (
                    <span key={index}>
                      <span className="fw-medium">{recipient.name}</span> &lt;{recipient.email}&gt;
                      {index < emailData.to.length - 1 && '; '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-4 bg-white">
            <div className="text-dark" style={{lineHeight: '1.6', whiteSpace: 'pre-line'}}>
              {emailData.messageBody}
            </div>
            
            <div className="alert alert-warning mt-4 d-flex align-items-start">
              <svg className="text-warning me-2 mt-1 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <div>
                <p className="fw-semibold text-warning-emphasis mb-1">Compliance Warning</p>
                <p className="small text-warning-emphasis mb-0">{emailData.complianceWarning}</p>
              </div>
            </div>
          </div>

          {/* Email Footer */}
          <div className="bg-light border-top p-2">
            <div className="d-flex justify-content-between align-items-center small text-muted">
              <div className="d-flex align-items-center">
                <span className="me-3">📎 No attachments</span>
                <span>🔒 This message was sent securely</span>
              </div>
              <span>Received: {emailData.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Security Configuration Component
  const AppConfigLogsContent = () => {
    const configData = getSecurityConfigData();
    return (
      <div className="bg-dark text-success font-monospace small shadow border border-secondary rounded overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-secondary text-light px-3 py-2 d-flex align-items-center justify-content-between" style={{fontSize: '11px'}}>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <div className="bg-danger rounded-circle me-1" style={{width: '12px', height: '12px'}}></div>
              <div className="bg-warning rounded-circle me-1" style={{width: '12px', height: '12px'}}></div>
              <div className="bg-success rounded-circle" style={{width: '12px', height: '12px'}}></div>
            </div>
            <span className="fw-medium">{configData.subtitle}</span>
          </div>
          <span className="text-muted">Last Updated: {configData.auditDate}</span>
        </div>

        {/* Terminal Content */}
        <div className="p-3">
          {/* Header */}
          <div className="border-bottom border-secondary pb-2 mb-3">
            <div className="text-warning">$ sudo cat /opt/customerdatapipeline/config/security.conf</div>
            <div className="text-muted" style={{fontSize: '10px'}}>
              [SERVICE ACCOUNT: svc-usr123] {configData.title}
            </div>
          </div>

          {/* Password Complexity Section */}
          <div className="mb-4">
            <div className="text-info fw-bold border-bottom border-secondary pb-1 mb-2">
              # PASSWORD COMPLEXITY CONFIGURATION
            </div>
            
            <div className="ms-3 mb-3">
              <div className="mb-1"><span className="text-warning">password.complexity.enabled</span>=<span className="text-success">true</span></div>
              <div className="mb-1"><span className="text-warning">password.min.length</span>=<span className="text-success">12</span></div>
              <div className="mb-1"><span className="text-warning">password.require.uppercase</span>=<span className="text-success">true</span></div>
              <div className="mb-1"><span className="text-warning">password.require.lowercase</span>=<span className="text-success">true</span></div>
              <div className="mb-1"><span className="text-warning">password.require.numbers</span>=<span className="text-success">true</span></div>
              <div className="mb-1"><span className="text-warning">password.require.special.chars</span>=<span className="text-success">true</span></div>
            </div>

            <div className="alert alert-success border-success p-2 mb-3">
              <div className="text-success fw-bold">✓ COMPLIANCE STATUS: ENFORCED</div>
              <div className="text-success" style={{fontSize: '10px'}}>
                Password complexity rules are actively enforced for service account svc-usr123
              </div>
            </div>
          </div>

          {/* Recent Security Events */}
          <div className="mb-4">
            <div className="text-info fw-bold border-bottom border-secondary pb-1 mb-2">
              # RECENT SECURITY EVENTS
            </div>
            
            <div className="ms-3" style={{fontSize: '10px'}}>
              {configData.events.map((event, index) => (
                <div key={index} className="mb-1">
                  <span className="text-muted">[{event.timestamp}]</span>{' '}
                  <span className={`text-${event.level === 'INFO' ? 'success' : event.level === 'WARN' ? 'warning' : 'info'}`}>
                    {event.level}
                  </span>{' '}
                  {event.message}
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Verification */}
          <div className="mb-4">
            <div className="text-info fw-bold border-bottom border-secondary pb-1 mb-2">
              # CONFIGURATION VERIFICATION
            </div>
            
            <div className="ms-3">
              <div className="text-warning mb-2">$ security-validator --check-service-account svc-usr123</div>
              <div className="ms-2">
                <div className="mb-1"><span className="text-success">✓</span> Password complexity requirements: <span className="text-success">{configData.verification.passwordComplexity}</span></div>
                <div className="mb-1"><span className="text-success">✓</span> Password rotation policy: <span className="text-success">{configData.verification.passwordRotation}</span></div>
                <div className="mb-1"><span className="text-success">✓</span> Security configuration integrity: <span className="text-success">{configData.verification.securityConfig}</span></div>
                <div className="mb-1"><span className="text-success">✓</span> Audit logging: <span className="text-success">{configData.verification.auditLogging}</span></div>
              </div>
            </div>

            <div className="alert alert-success border-success p-2 mt-3">
              <div className="text-success fw-bold">🔒 WELLS FARGO SECURITY COMPLIANCE: VERIFIED</div>
              <div className="text-success" style={{fontSize: '10px'}}>
                Service account svc-usr123 meets all Wells Fargo security requirements.
              </div>
              <div className="text-success" style={{fontSize: '10px'}}>
                Configuration hash: <span className="text-warning">{configData.hash}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-top border-secondary pt-2 text-muted" style={{fontSize: '10px'}}>
            <div>Configuration verified by: Wells Fargo Security Operations Center</div>
            <div>Next compliance check: {configData.nextCheck}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFileContent = (file: EvidenceFile) => {
    switch (file.type) {
      case 'ticket':
        return <JIRATicketContent />;
      case 'screenshot':
        return <EmailApprovalContent />;
      case 'document':
        return <AppConfigLogsContent />;
      default:
        return (
          <div className="text-center text-muted py-5">
            <p>Content not available for this file type</p>
          </div>
        );
    }
  };

  if (!initiallyOpen) {
    return null;
  }

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onModalClose()}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              <svg className="me-2 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6z"/>
              </svg>
              Evidence Files
            </h5>
            <button type="button" className="btn-close" onClick={onModalClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* File List Sidebar */}
              <div className="col-md-4 border-end bg-light">
                <div className="p-3">
                  <h6 className="fw-bold mb-3">Available Files ({evidenceFiles.length})</h6>
                  <div className="list-group list-group-flush">
                    {evidenceFiles.map((file, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center ${
                          selectedFile?.id === file.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="me-3">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-medium">{file.name}</div>
                          <small className="text-muted">{file.date} • {file.type.toUpperCase()}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* File Content */}
              <div className="col-md-8">
                <div className="p-4">
                  {selectedFile ? (
                    <>
                      <div className="d-flex align-items-center mb-4">
                        {getFileIcon(selectedFile.type)}
                        <div className="ms-3">
                          <h5 className="mb-1 fw-bold">{selectedFile.name}</h5>
                          <div className="text-muted">
                            <small>Date: {selectedFile.date} | Type: {selectedFile.type.toUpperCase()}</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="evidence-content">
                        {renderFileContent(selectedFile)}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted py-5">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mb-3">
                        <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6z"/>
                      </svg>
                      <p>Select a file to view its contents</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onModalClose}>
              Close
            </button>
            <button type="button" className="btn btn-wf-primary">
              <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              </svg>
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceViewer; 