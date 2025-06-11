'use client';

import React, { useState } from 'react';

interface ActionPanelProps {
  validationResult: any;
  accountData: any;
  onClose: () => void;
  isVisible: boolean;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ 
  validationResult, 
  accountData, 
  onClose, 
  isVisible 
}) => {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [actionInProgress, setActionInProgress] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const actions = [
    {
      id: 'contact-owner',
      title: 'Contact Account Owner',
      description: 'Send automated email to account owner for verification',
      severity: 'high',
      icon: '📧',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'generate-ticket',
      title: 'Generate New JIRA Ticket',
      description: 'Create new approval ticket to replace expired documentation',
      severity: 'high',
      icon: '🎫',
      estimatedTime: '5 minutes'
    },
    {
      id: 'deactivate-account',
      title: 'Deactivate Service Account',
      description: 'Temporarily disable account pending owner confirmation',
      severity: 'critical',
      icon: '🔒',
      estimatedTime: '1 minute'
    },
    {
      id: 'schedule-review',
      title: 'Schedule Quarterly Review',
      description: 'Set up automated compliance reviews for this account',
      severity: 'medium',
      icon: '📅',
      estimatedTime: '3 minutes'
    },
    {
      id: 'update-permissions',
      title: 'Review & Update Permissions',
      description: 'Apply principle of least privilege to current permissions',
      severity: 'medium',
      icon: '🔐',
      estimatedTime: '10-15 minutes'
    },
    {
      id: 'export-report',
      title: 'Export Compliance Report',
      description: 'Generate detailed audit report for management review',
      severity: 'low',
      icon: '📊',
      estimatedTime: '1 minute'
    }
  ];

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-danger text-danger';
      case 'high': return 'border-warning text-warning';
      case 'medium': return 'border-info text-info';
      default: return 'border-secondary text-secondary';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const handleExecuteAction = async (actionId: string) => {
    setSelectedAction(actionId);
    setActionInProgress(true);
    
    // Simulate action execution
    setTimeout(() => {
      setActionInProgress(false);
      setActionCompleted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setActionCompleted(false);
        setSelectedAction('');
      }, 3000);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-gradient text-white" style={{ background: 'linear-gradient(135deg, #d71e2b, #b8182a)' }}>
            <h5 className="modal-title fw-bold d-flex align-items-center">
              <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Remediation Actions
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {/* Account Summary */}
            <div className="card card-wf mb-4">
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3">Account Summary</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong>Account ID:</strong> {accountData?.account_id || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Application:</strong> {accountData?.application || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Owner:</strong> {accountData?.owner || 'N/A'}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong>Compliance Score:</strong> 
                      <span className="badge bg-warning ms-2">{validationResult?.score || 'N/A'}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong> 
                      <span className="badge bg-secondary ms-2">{validationResult?.compliance || 'N/A'}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Last Activity:</strong> {accountData?.metadata?.last_activity_days || 'N/A'} days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">🚀 Recommended Actions</h6>
              <div className="row g-3">
                {actions.map((action) => (
                  <div key={action.id} className="col-md-6">
                    <div className={`card h-100 border-2 ${getSeverityClass(action.severity)}`}>
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <span className="fs-4 me-2">{action.icon}</span>
                            <div>
                              <h6 className="card-title mb-1 fw-bold">{action.title}</h6>
                              <span className={`badge ${getSeverityBadge(action.severity)} text-white small`}>
                                {action.severity.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="card-text small text-muted mb-3">
                          {action.description}
                        </p>
                        
                        <div className="d-flex align-items-center justify-content-between">
                          <small className="text-muted">
                            ⏱️ {action.estimatedTime}
                          </small>
                          
                          <button
                            className="btn btn-sm btn-wf-primary"
                            onClick={() => handleExecuteAction(action.id)}
                            disabled={actionInProgress}
                          >
                            {actionInProgress && selectedAction === action.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Executing...
                              </>
                            ) : actionCompleted && selectedAction === action.id ? (
                              <>
                                <svg className="me-1" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                                Completed
                              </>
                            ) : (
                              'Execute'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI-Generated Remediation Plan */}
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-bold">
                  🤖 AI-Generated Remediation Plan
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="bg-light p-3 rounded mb-3">
                      <h6 className="fw-bold text-primary mb-2">Phase 1: Assessment</h6>
                      <ul className="list-unstyled small mb-0">
                        <li className="mb-1">✓ Contact account owner</li>
                        <li className="mb-1">✓ Review access requirements</li>
                        <li>✓ Audit activity logs</li>
                      </ul>
                      <div className="mt-2">
                        <span className="badge bg-info">Week 1</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="bg-light p-3 rounded mb-3">
                      <h6 className="fw-bold text-primary mb-2">Phase 2: Documentation</h6>
                      <ul className="list-unstyled small mb-0">
                        <li className="mb-1">✓ Create new approval ticket</li>
                        <li className="mb-1">✓ Update business justification</li>
                        <li>✓ Get management sign-off</li>
                      </ul>
                      <div className="mt-2">
                        <span className="badge bg-warning">Week 2</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="bg-light p-3 rounded mb-3">
                      <h6 className="fw-bold text-primary mb-2">Phase 3: Implementation</h6>
                      <ul className="list-unstyled small mb-0">
                        <li className="mb-1">✓ Apply least privilege</li>
                        <li className="mb-1">✓ Implement monitoring</li>
                        <li>✓ Schedule reviews</li>
                      </ul>
                      <div className="mt-2">
                        <span className="badge bg-success">Week 3</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info mt-3">
                  <h6 className="fw-bold mb-2">📊 Success Metrics</h6>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="fw-bold text-success">95%+</div>
                      <small>Target Compliance Score</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-primary">0</div>
                      <small>Violations Remaining</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-info">Quarterly</div>
                      <small>Review Schedule</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer bg-light">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="text-muted small">
                💡 <strong>Tip:</strong> Execute high-priority actions first for maximum compliance improvement
              </div>
              <div>
                <button type="button" className="btn btn-outline-secondary me-2" onClick={onClose}>
                  Close
                </button>
                <button type="button" className="btn btn-wf-primary">
                  <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                  Export Action Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel; 