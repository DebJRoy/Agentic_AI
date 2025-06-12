'use client';

import React from 'react';

interface ResultPanelProps {
  result: {
    accountData: any;
    validationResult: any;
    evidence: any;
  };
  onViewEvidence: () => void;
  onProvideFeedback: () => void;
  onTakeAction: () => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ result, onViewEvidence, onProvideFeedback, onTakeAction }) => {
  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-danger';
      case 'MEDIUM': return 'bg-warning';
      case 'LOW': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getViolationSeverity = (violation: string) => {
    const v = violation.toLowerCase();
    if (v.includes('inactive') || v.includes('dormant') || v.includes('unused')) {
      return { severity: 'HIGH', icon: '⚠️', color: 'text-danger' };
    }
    if (v.includes('expired') || v.includes('stale') || v.includes('outdated')) {
      return { severity: 'MEDIUM', icon: '⏰', color: 'text-warning' };
    }
    if (v.includes('permission') || v.includes('access') || v.includes('privilege')) {
      return { severity: 'MEDIUM', icon: '🔒', color: 'text-warning' };
    }
    return { severity: 'LOW', icon: '📋', color: 'text-info' };
  };

  const formatViolation = (violation: string | any) => {
    // Handle both string and object formats
    const violationText = typeof violation === 'string' ? violation : violation.type || violation.message || 'Unknown violation';
    const { severity, icon, color } = getViolationSeverity(violationText);
    
    return {
      text: violationText,
      severity,
      icon,
      color
    };
  };

  return (
    <div className="card card-wf mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="h4 fw-bold mb-2">Validation Results</h3>
            <p className="text-muted mb-0">
              Account ID: <span className="fw-semibold text-dark">{result.accountData.account_id}</span>
            </p>
          </div>
          <div>
            <span className={`badge ${getRiskBadgeClass(result.validationResult.violations?.length > 2 ? 'HIGH' : result.validationResult.violations?.length > 0 ? 'MEDIUM' : 'LOW')} badge-lg px-3 py-2 fs-6`}>
              {result.validationResult.violations?.length > 2 ? 'HIGH' : result.validationResult.violations?.length > 0 ? 'MEDIUM' : 'LOW'} RISK
            </span>
          </div>
        </div>
        
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 border-light">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <svg className="me-2 text-primary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Account Information
                </h5>
                <div className="row g-2">
                  <div className="col-12">
                    <small className="text-muted">Account Type</small>
                    <div className="fw-semibold">{result.accountData.metadata?.account_type || 'Standard Service Account'}</div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Application</small>
                    <div className="fw-semibold">{result.accountData.application}</div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Owner</small>
                    <div className="fw-semibold">{result.accountData.owner}</div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Status</small>
                    <div className="fw-semibold">
                      <span className={`badge ${result.accountData.metadata?.last_activity_days < 90 ? 'bg-success' : 'bg-warning'} me-2`}>
                        {result.accountData.metadata?.last_activity_days < 90 ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Last Activity</small>
                    <div className="fw-semibold">
                      {result.accountData.last_used ? (() => {
                        try {
                          const date = new Date(result.accountData.last_used);
                          return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          });
                        } catch (error) {
                          return 'Invalid Date';
                        }
                      })() : 'Unknown'}
                      {result.accountData.metadata?.last_activity_days && (
                        <span className="text-muted ms-2">
                          ({result.accountData.metadata.last_activity_days} days ago)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card h-100 border-light">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <svg className="me-2 text-warning" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  Compliance Status
                </h5>
                <div className="row g-2">
                  <div className="col-12">
                    <small className="text-muted">Compliance Status</small>
                    <div className="fw-semibold">
                      <span className={`badge ${result.validationResult.compliance === 'Partially Compliant' ? 'bg-warning text-dark' : result.validationResult.compliance === 'Compliant' ? 'bg-success' : 'bg-danger'} me-2`}>
                        {result.validationResult.compliance}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Violations Found</small>
                    <div className="fw-semibold">
                      <span className={`badge ${result.validationResult.violations?.length > 0 ? 'bg-danger' : 'bg-success'} me-2`}>
                        {result.validationResult.violations?.length || 0}
                      </span>
                      {result.validationResult.violations?.length === 1 ? 'issue' : 'issues'}
                    </div>
                  </div>
                  {result.validationResult.violations && result.validationResult.violations.length > 0 && (
                    <div className="col-12">
                      <small className="text-muted">Issues</small>
                      <div className="mt-2">
                        {result.validationResult.violations.map((violation: any, index: number) => {
                          const formatted = formatViolation(violation);
                          return (
                            <div key={index} className="d-flex align-items-start mb-2 p-2 bg-light rounded">
                              <span className="me-2 fs-5">{formatted.icon}</span>
                              <div className="flex-grow-1">
                                <div className={`fw-medium ${formatted.color} mb-1`}>
                                  {formatted.text}
                                </div>
                                <small className="text-muted">
                                  Severity: <span className={`fw-bold ${formatted.color}`}>{formatted.severity}</span>
                                </small>
                              </div>
                            </div>
                          );
                        })}
                        {result.validationResult.violations.length > 2 && (
                          <div className="text-center mt-2">
                            <button className="btn btn-sm btn-outline-secondary" onClick={onViewEvidence}>
                              View All Issues ({result.validationResult.violations.length})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {(!result.validationResult.violations || result.validationResult.violations.length === 0) && (
                    <div className="col-12">
                      <div className="d-flex align-items-center text-success">
                        <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <small className="fw-medium">No compliance violations detected</small>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card border-light mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              <svg className="me-2 text-info" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2z"/>
              </svg>
              Validation Summary
            </h5>
            <div className="row">
              <div className="col-md-8">
                <p className="text-dark mb-2">
                  {result.validationResult.explanation || 'This service account has been analyzed for compliance with Wells Fargo security policies.'}
                </p>
                {result.validationResult.recommendation && (
                  <div className="alert alert-info mb-0">
                    <strong>Recommendation:</strong> {result.validationResult.recommendation}
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="text-end">
                  <small className="text-muted d-block">Compliance Score</small>
                  <div className={`h4 fw-bold mb-0 ${result.validationResult.score === '78%' ? 'text-warning' : 'text-success'}`}>
                    {result.validationResult.score}
                  </div>
                  <small className="text-muted">{result.validationResult.compliance}</small>
                  <div className="mt-2">
                    <small className="text-muted d-block">Risk Level</small>
                    <span className={`badge ${result.validationResult.violations?.length > 2 ? 'bg-danger' : result.validationResult.violations?.length > 0 ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {result.validationResult.violations?.length > 2 ? 'High' : result.validationResult.violations?.length > 0 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className="btn btn-wf-primary"
            onClick={onViewEvidence}
          >
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            </svg>
            View Evidence
          </button>
          
          <button 
            className="btn btn-warning text-white fw-bold"
            onClick={onTakeAction}
          >
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Take Action
          </button>
          
          <button 
            className="btn btn-wf-secondary"
            onClick={onProvideFeedback}
          >
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Provide Feedback
          </button>
          
          <button className="btn btn-outline-secondary">
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            </svg>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel; 