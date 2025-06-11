'use client';

import { useState } from 'react';
import Header from '../components/Header';
import InputPanel from '../components/InputPanel';
import ResultPanel from '../components/ResultPanel';
import EvidenceViewer from '../components/EvidenceViewer';
import FeedbackBox from '../components/FeedbackBox';
import ArchitectureInfo from '../components/ArchitectureInfo';
import Chatbot from '../components/Chatbot';
import ActionPanel from '../components/ActionPanel';
import { getMockServiceAccount, getMockValidationResult, getEvidenceFiles } from '../data/mockData';

// Use the rich mock data
const mockAccountData = getMockServiceAccount('svc-usr123');
const mockValidationResult = getMockValidationResult();
const mockEvidenceFiles = getEvidenceFiles();

const mockData = {
  accountData: mockAccountData,
  validationResult: mockValidationResult,
  evidence: mockEvidenceFiles
};

export default function Home() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [complianceAlert, setComplianceAlert] = useState(true);

  const handleValidate = async (accountId: string, region: string) => {
    setIsValidating(true);
    setValidationResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setValidationResult(mockData);
      setIsValidating(false);
    }, 2000);
  };

  const handleViewEvidence = () => {
    setShowEvidence(true);
  };

  const handleSubmitFeedback = (rating: number, feedback: string) => {
    console.log('Feedback submitted:', { rating, feedback });
    setShowFeedback(false);
    // Show success message
    if (rating > 0 && feedback !== '') {
      alert('Thank you for your feedback!');
    }
  };

  const handleCloseModals = () => {
    setShowEvidence(false);
    setShowFeedback(false);
    setShowArchitecture(false);
    setShowActions(false);
  };

  return (
    <div className="min-vh-100 bg-light position-relative">
      {/* Watermark */}
      <div className="watermark"></div>
      
      {/* Main Content */}
      <div className={showEvidence || showFeedback || showArchitecture || showActions ? 'content-blur' : ''}>
        <Header 
          title="IAM Validation Assistant" 
          subtitle="Non-Human Account Validation"
        />
        
        <main className="container py-4">
          {/* Compliance Alert */}
          {complianceAlert && (
            <div className="alert alert-wf-warning alert-dismissible fade show mb-4" role="alert">
              <div className="d-flex align-items-start">
                <svg className="text-warning me-3 mt-1 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <div className="flex-grow-1">
                  <h6 className="alert-heading fw-bold mb-2">Compliance Notice</h6>
                  <p className="mb-2">
                    This tool validates non-human accounts for compliance with Wells Fargo security policies. 
                    Ensure all service accounts follow proper naming conventions and access patterns.
                  </p>
                  <hr />
                  <p className="mb-0 small">
                    <strong>Important:</strong> All validation activities are logged for audit purposes.
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close"
                onClick={() => setComplianceAlert(false)}
              ></button>
            </div>
          )}

          <div className="row">
            <div className="col-lg-8">
              <InputPanel 
                onValidate={handleValidate} 
                isLoading={isValidating} 
              />
              
              {validationResult && (
                <div className="fade-in">
                  <ResultPanel 
                    result={validationResult}
                    onViewEvidence={handleViewEvidence}
                    onProvideFeedback={() => setShowFeedback(true)}
                    onTakeAction={() => setShowActions(true)}
                  />
                </div>
              )}
            </div>
            
            <div className="col-lg-4">
              <div className="card card-wf">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">Quick Actions</h5>
                  
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setShowArchitecture(true)}
                    >
                      <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      View Architecture
                    </button>
                    
                    <button className="btn btn-outline-secondary btn-sm">
                      <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      </svg>
                      Download Report
                    </button>
                    
                    <button className="btn btn-outline-info btn-sm">
                      <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                      </svg>
                      Help & Support
                    </button>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <h6 className="fw-semibold mb-3">Recent Activity</h6>
                  <div className="small text-muted">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Service accounts validated</span>
                      <span className="badge badge-wf-secondary">247</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Compliance issues found</span>
                      <span className="badge badge-wf-primary">12</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Last validation</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold">Wells Fargo IAM Validation</h6>
                <p className="small mb-0">
                  Secure • Compliant • Reliable
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="small">
                  <p className="mb-1">© 2024 Wells Fargo & Company</p>
                  <p className="mb-0">Version 2.1.0 | Build 20240118</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Fixed Buttons */}
      <button 
        className="fixed-arch-button"
        onClick={() => setShowArchitecture(true)}
        title="View System Architecture"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>

      {/* Chatbot */}
      <Chatbot 
        accountData={validationResult}
        validationResult={validationResult}
      />

      {/* Modals */}
      {showEvidence && (
        <EvidenceViewer 
          evidenceFiles={mockData.evidence}
          onModalClose={handleCloseModals}
          initiallyOpen={true}
        />
      )}

      {showFeedback && (
        <FeedbackBox 
          onSubmitFeedback={handleSubmitFeedback}
          onClose={handleCloseModals}
        />
      )}

      {showArchitecture && (
        <ArchitectureInfo onClose={handleCloseModals} />
      )}

      {showActions && (
        <ActionPanel 
          validationResult={mockData.validationResult}
          accountData={mockData.accountData}
          onClose={handleCloseModals}
          isVisible={true}
        />
      )}
    </div>
  );
}
