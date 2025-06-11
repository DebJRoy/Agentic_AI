'use client';

import React, { useState } from 'react';

interface FeedbackBoxProps {
  onSubmitFeedback: (rating: number, feedback: string) => void;
  onClose: () => void;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ onSubmitFeedback, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (rating === null) return;
    
    onSubmitFeedback(rating, comment.trim());
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div 
        className="modal fade show d-block" 
        tabIndex={-1} 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center py-5">
              <div className="bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h4 className="fw-bold mb-3">Thank you for your feedback!</h4>
              <p className="text-muted mb-4">Your input helps us improve our validation system.</p>
              <button 
                className="btn btn-wf-primary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="modal fade show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Validation Feedback</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-muted mb-4">How would you rate this validation?</p>
            
            <div className="d-flex justify-content-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="btn btn-outline-warning p-2"
                  onClick={() => setRating(star)}
                  style={{ border: 'none' }}
                >
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill={rating && star <= rating ? '#ffc107' : 'none'}
                    stroke="#ffc107"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              ))}
            </div>
            
            {rating !== null && (
              <div className="text-center mb-4">
                <span className="badge bg-secondary px-3 py-2">
                  {rating} out of 5 stars
                </span>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="feedbackComment" className="form-label fw-semibold">
                Additional Comments (Optional)
              </label>
              <textarea
                id="feedbackComment"
                className="form-control form-control-wf"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please share your thoughts on the validation process..."
              />
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-wf-primary"
              onClick={handleSubmit}
              disabled={rating === null}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBox; 