import React from 'react';
import { IBenefit } from '@/lib/types';

interface BenefitCardProps {
  benefit: IBenefit;
  status: 'eligible' | 'ineligible' | 'pending';
  failures?: string[];
  successes?: string[];
  isOffline?: boolean;
}

export function BenefitCard({ benefit, status, failures = [], successes = [], isOffline = false }: BenefitCardProps) {
  const isLinkEnabled = status !== 'ineligible' && !isOffline;

  return (
    <a 
      href={isLinkEnabled ? benefit.url : '#'} 
      target={isLinkEnabled ? "_blank" : "_self"} 
      rel="noopener noreferrer" 
      className={`benefit-card ${status === 'ineligible' ? 'card-ineligible' : ''} ${isOffline ? 'card-unavailable' : ''}`}
      style={{ opacity: 1, animation: 'fadeIn 0.5s ease forwards' }} // Simulating the animation style from js
    >
      {isOffline && (
        <div className="badge-offline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Institución temporalmente no disponible
        </div>
      )}

      <div 
        className="benefit-tag" 
        style={status === 'ineligible' ? { background: 'rgba(100,116,139,0.1)', color: 'var(--text-secondary)', boxShadow: 'none' } : undefined}
      >
        {benefit.tag}
      </div>
      
      <h3 
        className="benefit-title" 
        style={status === 'ineligible' ? { color: 'var(--text-secondary)' } : undefined}
      >
        {benefit.title}
      </h3>
      
      <p className="benefit-desc">{benefit.description}</p>

      {status !== 'ineligible' && successes.length > 0 && (
        <ul className="success-list">
          {successes.map((success, index) => (
            <li key={index} className="success-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {success}
            </li>
          ))}
        </ul>
      )}

      {status === 'ineligible' && failures.length > 0 && (
        <ul className="reason-list">
          {failures.map((fail, index) => (
            <li key={index} className="reason-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {fail}
            </li>
          ))}
        </ul>
      )}

      {status !== 'ineligible' && (
        <div className="benefit-action" style={{ marginTop: 'auto' }}>
          Ir al beneficio <span>→</span>
        </div>
      )}
    </a>
  );
}
