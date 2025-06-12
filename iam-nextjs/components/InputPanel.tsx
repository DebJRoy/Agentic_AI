'use client';

import React, { useState } from 'react';

interface InputPanelProps {
  onValidate: (accountId: string) => void;
  isLoading: boolean;
  onCompleteReset: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onValidate, isLoading, onCompleteReset }) => {
  const [accountId, setAccountId] = useState('');
  const [region, setRegion] = useState('us-east-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountId.trim()) {
      onValidate(accountId.trim());
    }
  };

  const handleReset = () => {
    // Reset local form state
    setAccountId('');
    setRegion('us-east-1');
    // Reset entire application state
    onCompleteReset();
  };

  return (
    <div className="card card-wf mb-4">
      <div className="card-wf-header">
        <h3 className="h5 mb-0 fw-bold">Service Account Validation</h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="accountId" className="form-label fw-semibold">
                Service Account ID
              </label>
              <input
                type="text"
                id="accountId"
                className="form-control form-control-lg form-control-wf"
                placeholder="Enter service account ID..."
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                required
                disabled={isLoading}
              />
              <div className="form-text">
                Enter the service account identifier to validate
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="region" className="form-label fw-semibold">
                AWS Region
              </label>
              <select
                id="region"
                className="form-select form-select-lg form-control-wf"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                disabled={isLoading}
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-east-2">US East (Ohio)</option>
                <option value="us-west-1">US West (N. California)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">Europe (Ireland)</option>
                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button
                type="submit"
                className={`btn btn-wf-primary btn-lg px-4 ${isLoading ? 'disabled' : ''}`}
                disabled={isLoading || !accountId.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Validating...
                  </>
                ) : (
                  <>
                    <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Validate Account
                  </>
                )}
              </button>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-wf-secondary btn-lg px-4"
                onClick={handleReset}
                disabled={isLoading}
              >
                <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
                Reset
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-4">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="border border-2 border-light rounded-3 p-3">
                <div className="h4 text-success mb-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="small text-muted">Secure Validation</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border border-2 border-light rounded-3 p-3">
                <div className="h4 text-primary mb-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <div className="small text-muted">Enterprise Grade</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border border-2 border-light rounded-3 p-3">
                <div className="h4 text-info mb-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                  </svg>
                </div>
                <div className="small text-muted">Real-time Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel; 