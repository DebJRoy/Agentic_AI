'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient bg-danger text-white py-4 shadow-lg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <div 
              className="d-flex align-items-center justify-content-center bg-white rounded-circle"
              style={{ width: '56px', height: '56px' }}
            >
              <svg 
                className="text-danger" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
          <div className="col">
            <h1 className="h2 mb-1 fw-bold">{title}</h1>
            {subtitle && (
              <p className="mb-0 opacity-75">{subtitle}</p>
            )}
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <div className="me-3 text-end">
                <div className="small opacity-75">Wells Fargo</div>
                <div className="small fw-semibold">Security Portal</div>
              </div>
              <div 
                className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <svg 
                  className="text-white" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 