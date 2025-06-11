'use client';

import React from 'react';

interface ArchitectureInfoProps {
  onClose?: () => void;
}

const ArchitectureInfo: React.FC<ArchitectureInfoProps> = ({ onClose }) => {
  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              System Architecture
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <span className="badge bg-danger bg-opacity-10 text-danger px-4 py-2 fs-6 fw-bold">
                Wells Fargo IAM Validation Architecture
              </span>
            </div>
            
            {/* Architecture Diagram */}
            <div className="card border-primary mb-4">
              <div className="card-header bg-primary bg-opacity-10 text-center">
                <h6 className="mb-0 fw-bold text-primary">IAM Validation Flow</h6>
              </div>
              <div className="card-body p-4">
                {/* Process Flow */}
                <div className="row g-3 mb-4">
                  <div className="col-6 col-lg-3">
                    <div className="card h-100 border-danger">
                      <div className="card-body text-center p-3">
                        <div className="position-relative">
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            1
                          </span>
                          <svg className="text-danger mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          </svg>
                        </div>
                        <h6 className="fw-bold small">Input Handler</h6>
                        <p className="small text-muted mb-0">Service Account ID</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-6 col-lg-3">
                    <div className="card h-100 border-warning">
                      <div className="card-body text-center p-3">
                        <div className="position-relative">
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                            2
                          </span>
                          <svg className="text-warning mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                          </svg>
                        </div>
                        <h6 className="fw-bold small">Data Collection</h6>
                        <p className="small text-muted mb-0">Metadata & Evidence</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-6 col-lg-3">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center p-3">
                        <div className="position-relative">
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            3
                          </span>
                          <svg className="text-success mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                          </svg>
                        </div>
                        <h6 className="fw-bold small">Validation Agent</h6>
                        <p className="small text-muted mb-0">Apply IAM Rules</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-6 col-lg-3">
                    <div className="card h-100 border-info">
                      <div className="card-body text-center p-3">
                        <div className="position-relative">
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                            4
                          </span>
                          <svg className="text-info mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <h6 className="fw-bold small">Results Generator</h6>
                        <p className="small text-muted mb-0">Compliance Results</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Flow Arrow */}
                <div className="text-center mb-4">
                  <div className="border-top border-3 border-primary w-75 mx-auto position-relative">
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-2">
                      <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </span>
                  </div>
                </div>
                
                {/* Evidence Collector */}
                <div className="row justify-content-center mb-4">
                  <div className="col-md-6">
                    <div className="card border-primary bg-primary bg-opacity-10">
                      <div className="card-body text-center p-4">
                        <div className="position-relative">
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                            5
                          </span>
                          <svg className="text-primary mb-2" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                          </svg>
                        </div>
                        <h5 className="fw-bold">Evidence Collector</h5>
                        <p className="text-muted mb-0">Manage Documents & Evidence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* External Systems */}
            <div className="card">
              <div className="card-header bg-secondary bg-opacity-10">
                <h6 className="mb-0 fw-bold text-secondary">External Systems Integration</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6 col-md-4 col-lg">
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <span className="fw-bold text-primary">T</span>
                      </div>
                      <h6 className="small fw-bold">Tachyon</h6>
                      <p className="small text-muted mb-0">Activity Discovery</p>
                    </div>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg">
                    <div className="text-center">
                      <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <span className="fw-bold text-success">M</span>
                      </div>
                      <h6 className="small fw-bold">MCP</h6>
                      <p className="small text-muted mb-0">Metadata Collection</p>
                    </div>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg">
                    <div className="text-center">
                      <div className="bg-warning bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <span className="fw-bold text-warning">A</span>
                      </div>
                      <h6 className="small fw-bold">Apigee</h6>
                      <p className="small text-muted mb-0">API Gateway</p>
                    </div>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg">
                    <div className="text-center">
                      <div className="bg-info bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <span className="fw-bold text-info">E</span>
                      </div>
                      <h6 className="small fw-bold">Evidence Store</h6>
                      <p className="small text-muted mb-0">Document Storage</p>
                    </div>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg">
                    <div className="text-center">
                      <div className="bg-danger bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <span className="fw-bold text-danger">N</span>
                      </div>
                      <h6 className="small fw-bold">NLP Engine</h6>
                      <p className="small text-muted mb-0">Context Analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technical Details */}
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Technical Implementation</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="fw-bold text-primary">Frontend</h6>
                      <ul className="list-unstyled small mb-0">
                        <li>• Next.js 15 with TypeScript</li>
                        <li>• Bootstrap 5 for styling</li>
                        <li>• Real-time updates</li>
                        <li>• Responsive design</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="fw-bold text-success">Backend</h6>
                      <ul className="list-unstyled small mb-0">
                        <li>• Node.js with Express</li>
                        <li>• RESTful API design</li>
                        <li>• JWT authentication</li>
                        <li>• Database integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary">
              Download Architecture
            </button>
            <button type="button" className="btn btn-wf-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureInfo; 