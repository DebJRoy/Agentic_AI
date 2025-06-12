'use client';

import React, { useState } from 'react';

interface ArchitectureInfoProps {
  onClose?: () => void;
}

const ArchitectureInfo: React.FC<ArchitectureInfoProps> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const architectureSteps = [
    {
      id: 1,
      title: "Input Handler",
      subtitle: "Service Account ID",
      description: "Receives and validates service account identifiers from user input",
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z",
      color: "danger",
      details: ["Input validation", "Format checking", "Security scanning"]
    },
    {
      id: 2,
      title: "Data Collection",
      subtitle: "Metadata & Evidence",
      description: "Gathers comprehensive data from multiple enterprise systems",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
      color: "warning",
      details: ["Metadata extraction", "Evidence gathering", "System integration"]
    },
    {
      id: 3,
      title: "Validation Agent",
      subtitle: "Apply IAM Rules",
      description: "Intelligent agent applies Wells Fargo IAM policies and compliance rules",
      icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
      color: "success",
      details: ["Policy enforcement", "Compliance checking", "Risk assessment"]
    },
    {
      id: 4,
      title: "Results Generator",
      subtitle: "Compliance Results",
      description: "Generates comprehensive compliance reports and recommendations",
      icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "info",
      details: ["Report generation", "Risk scoring", "Recommendations"]
    }
  ];

  const externalSystems = [
    {
      id: "tachyon",
      name: "Tachyon",
      description: "Activity Discovery & Monitoring",
      icon: "T",
      color: "primary",
      details: ["Real-time activity tracking", "Usage pattern analysis", "Anomaly detection"]
    },
    {
      id: "mcp",
      name: "MCP",
      description: "Metadata Collection Platform",
      icon: "M",
      color: "success",
      details: ["Account metadata", "Ownership tracking", "Lifecycle management"]
    },
    {
      id: "apigee",
      name: "Apigee",
      description: "API Gateway & Management",
      icon: "A",
      color: "warning",
      details: ["API authentication", "Rate limiting", "Request routing"]
    },
    {
      id: "evidence",
      name: "Evidence Store",
      description: "Document & Evidence Management",
      icon: "E",
      color: "info",
      details: ["Document storage", "Version control", "Access tracking"]
    },
    {
      id: "nlp",
      name: "NLP Engine",
      description: "Context Analysis & Intelligence",
      icon: "N",
      color: "danger",
      details: ["Natural language processing", "Context understanding", "Intent recognition"]
    }
  ];

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          {/* Enhanced Header */}
          <div className="modal-header bg-gradient bg-primary text-white border-0 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
              <div className="w-100 h-100" style={{
                background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)'
              }}></div>
            </div>
            <div className="d-flex align-items-center">
              <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">System Architecture</h5>
                <small className="opacity-75">Wells Fargo IAM Validation Platform</small>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            {/* Hero Section */}
            <div className="bg-gradient bg-light p-4 border-bottom">
              <div className="text-center">
                <div className="badge bg-danger bg-opacity-10 text-danger px-4 py-2 fs-6 fw-bold mb-3">
                  🏛️ Enterprise-Grade IAM Validation
                </div>
                <p className="text-muted mb-0 lead">
                  Intelligent service account validation powered by AI and enterprise integrations
                </p>
              </div>
            </div>

            {/* Main Architecture Flow */}
            <div className="p-4">
              <h6 className="fw-bold mb-4 text-primary">
                <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
                Validation Flow Architecture
              </h6>
              
              {/* Interactive Process Steps */}
              <div className="row g-4 mb-5">
                {architectureSteps.map((step, index) => (
                  <div key={step.id} className="col-lg-3 col-md-6">
                    <div 
                      className={`card h-100 border-${step.color} position-relative transition-all cursor-pointer ${
                        activeStep === step.id ? `bg-${step.color} bg-opacity-10 shadow-lg scale-105` : 'hover-lift'
                      }`}
                      style={{ 
                        transition: 'all 0.3s ease',
                        transform: activeStep === step.id ? 'scale(1.05)' : 'scale(1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div className="card-body text-center p-4">
                        {/* Step Number Badge */}
                        <div className="position-absolute top-0 start-100 translate-middle">
                          <span className={`badge rounded-pill bg-${step.color} px-3 py-2 fw-bold`}>
                            {step.id}
                          </span>
                        </div>
                        
                        {/* Icon with Animation */}
                        <div className={`text-${step.color} mb-3`} style={{
                          transform: activeStep === step.id ? 'scale(1.2)' : 'scale(1)',
                          transition: 'transform 0.3s ease'
                        }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d={step.icon}/>
                          </svg>
                        </div>
                        
                        <h6 className="fw-bold mb-2">{step.title}</h6>
                        <p className="small text-muted mb-3">{step.subtitle}</p>
                        
                        {/* Expanded Details */}
                        {activeStep === step.id && (
                          <div className="fade-in">
                            <p className="small mb-3">{step.description}</p>
                            <div className="text-start">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="small text-muted mb-1">
                                  <span className={`text-${step.color} me-2`}>▸</span>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Flow Connector */}
              <div className="text-center mb-5">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="border-top border-3 border-primary flex-grow-1 position-relative" style={{ maxWidth: '200px' }}>
                    <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                      <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="mx-4">
                    <div className="bg-primary bg-opacity-10 rounded-pill p-3">
                      <svg className="text-primary" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="border-top border-3 border-primary flex-grow-1 position-relative" style={{ maxWidth: '200px' }}>
                    <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                      <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="fw-bold text-primary">Evidence Management Layer</h6>
                  <p className="small text-muted mb-0">Centralized document and evidence processing</p>
                </div>
              </div>
            </div>

            {/* External Systems Integration */}
            <div className="bg-light p-4">
              <h6 className="fw-bold mb-4 text-secondary">
                <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v16H4V4zm1 1v14h14V5H5z"/>
                </svg>
                External Systems Integration
              </h6>
              
              <div className="row g-4">
                {externalSystems.map((system) => (
                  <div key={system.id} className="col-lg col-md-4 col-sm-6">
                    <div 
                      className={`card border-0 shadow-sm h-100 transition-all cursor-pointer ${
                        activeSystem === system.id ? 'shadow-lg scale-105' : ''
                      }`}
                      style={{ 
                        transition: 'all 0.3s ease',
                        transform: activeSystem === system.id ? 'scale(1.05)' : 'scale(1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setActiveSystem(system.id)}
                      onMouseLeave={() => setActiveSystem(null)}
                    >
                      <div className="card-body text-center p-4">
                        <div 
                          className={`bg-${system.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`}
                          style={{ 
                            width: '60px', 
                            height: '60px',
                            transform: activeSystem === system.id ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <span className={`fw-bold text-${system.color} fs-4`}>{system.icon}</span>
                        </div>
                        <h6 className="fw-bold mb-2">{system.name}</h6>
                        <p className="small text-muted mb-0">{system.description}</p>
                        
                        {/* Expanded Details */}
                        {activeSystem === system.id && (
                          <div className="fade-in mt-3">
                            <div className="border-top pt-3">
                              {system.details.map((detail, idx) => (
                                <div key={idx} className="small text-muted text-start mb-1">
                                  <span className={`text-${system.color} me-2`}>•</span>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                         {/* Technical Implementation */}
             <div className="bg-white border-top p-4">
               <h6 className="fw-bold mb-4 text-secondary">
                 <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                 </svg>
                 Technical Stack & Implementation
               </h6>
               
               <div className="row g-4">
                 <div className="col-md-4">
                   <div className="card border shadow-sm h-100" style={{ borderColor: '#e9ecef' }}>
                     <div className="card-body p-4">
                       <div className="d-flex align-items-center mb-3">
                         <div className="bg-light border rounded-circle p-2 me-3" style={{ width: '40px', height: '40px' }}>
                           <svg className="text-secondary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                           </svg>
                         </div>
                         <h6 className="fw-bold text-dark mb-0">Frontend</h6>
                       </div>
                       <ul className="list-unstyled small mb-0 text-muted">
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Next.js 15</strong> with TypeScript</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Bootstrap 5</strong> responsive design</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Real-time</strong> updates & notifications</span>
                         </li>
                         <li className="mb-0 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Progressive</strong> web app features</span>
                         </li>
                       </ul>
                     </div>
                   </div>
                 </div>
                 
                 <div className="col-md-4">
                   <div className="card border shadow-sm h-100" style={{ borderColor: '#e9ecef' }}>
                     <div className="card-body p-4">
                       <div className="d-flex align-items-center mb-3">
                         <div className="bg-light border rounded-circle p-2 me-3" style={{ width: '40px', height: '40px' }}>
                           <svg className="text-secondary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                           </svg>
                         </div>
                         <h6 className="fw-bold text-dark mb-0">Backend</h6>
                       </div>
                       <ul className="list-unstyled small mb-0 text-muted">
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Node.js</strong> with Express framework</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">RESTful APIs</strong> & GraphQL</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">JWT</strong> authentication & authorization</span>
                         </li>
                         <li className="mb-0 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Microservices</strong> architecture</span>
                         </li>
                       </ul>
                     </div>
                   </div>
                 </div>
                 
                 <div className="col-md-4">
                   <div className="card border shadow-sm h-100" style={{ borderColor: '#e9ecef' }}>
                     <div className="card-body p-4">
                       <div className="d-flex align-items-center mb-3">
                         <div className="bg-light border rounded-circle p-2 me-3" style={{ width: '40px', height: '40px' }}>
                           <svg className="text-secondary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                           </svg>
                         </div>
                         <h6 className="fw-bold text-dark mb-0">Infrastructure</h6>
                       </div>
                       <ul className="list-unstyled small mb-0 text-muted">
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">PostgreSQL</strong> with Redis caching</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Docker</strong> containerization</span>
                         </li>
                         <li className="mb-2 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Kubernetes</strong> orchestration</span>
                         </li>
                         <li className="mb-0 d-flex align-items-start">
                           <span className="text-secondary me-2 mt-1" style={{ fontSize: '8px' }}>●</span>
                           <span><strong className="text-dark">Enterprise</strong> security standards</span>
                         </li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            {/* Key Features */}
            <div className="bg-dark text-white p-4">
              <h6 className="fw-bold mb-4">
                <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Key Platform Features
              </h6>
              
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div className="text-primary mb-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                    </div>
                    <h6 className="fw-bold small">Enterprise Security</h6>
                    <p className="small text-light opacity-75 mb-0">Bank-grade security standards</p>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div className="text-success mb-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                      </svg>
                    </div>
                    <h6 className="fw-bold small">Real-time Processing</h6>
                    <p className="small text-light opacity-75 mb-0">Instant validation results</p>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div className="text-warning mb-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h6 className="fw-bold small">AI-Powered Analysis</h6>
                    <p className="small text-light opacity-75 mb-0">Intelligent compliance checking</p>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div className="text-info mb-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h6 className="fw-bold small">Comprehensive Reporting</h6>
                    <p className="small text-light opacity-75 mb-0">Detailed compliance reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer border-0 bg-light">
            <button type="button" className="btn btn-outline-secondary">
              <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              </svg>
              Download Documentation
            </button>
            <button type="button" className="btn btn-wf-primary" onClick={onClose}>
              <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureInfo; 