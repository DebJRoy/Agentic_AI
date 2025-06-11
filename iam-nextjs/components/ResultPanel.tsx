'use client';

import React from 'react';

interface ResultPanelProps {
  result: any;
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

  return (
    <div className="card card-wf mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="h4 fw-bold mb-2">Validation Results</h3>
            <p className="text-muted mb-0">
              Account ID: <span className="fw-semibold text-dark">{result.accountId}</span>
            </p>
          </div>
          <div>
            <span className={`badge ${getRiskBadgeClass(result.riskScore)} badge-lg px-3 py-2 fs-6`}>
              {result.riskScore} RISK
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
                    <div className="fw-semibold">{result.accountType}</div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Status</small>
                    <div className="fw-semibold">
                      <span className={`badge ${result.status === 'Active' ? 'bg-success' : 'bg-secondary'} me-2`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <small className="text-muted">Last Activity</small>
                    <div className="fw-semibold">{new Date(result.lastActivity).toLocaleDateString()}</div>
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
                    <small className="text-muted">Violations Found</small>
                    <div className="fw-semibold">
                      {result.violations?.length || 0} issues
                    </div>
                  </div>
                  {result.violations && result.violations.length > 0 && (
                    <div className="col-12">
                      <small className="text-muted">Issues</small>
                      <ul className="list-unstyled mb-0">
                        {result.violations.slice(0, 2).map((violation: any, index: number) => (
                          <li key={index} className="small text-danger fw-medium mb-1">
                            <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                            </svg>
                            {violation.type}
                          </li>
                        ))}
                      </ul>
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
            <p className="text-dark mb-0">
              This service account has been analyzed for compliance with Wells Fargo security policies. 
              {result.violations?.length > 0 
                ? ` Found ${result.violations.length} compliance issues that require attention.`
                : ' No compliance violations detected - account appears to be in good standing.'
              }
            </p>
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