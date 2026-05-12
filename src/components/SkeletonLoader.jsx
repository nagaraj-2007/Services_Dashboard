import React from 'react';

const SkeletonLoader = ({ type }) => {
  if (type === 'stat-card') {
    return (
      <div className="card stat-card skeleton-pulse">
        <div className="stat-icon" style={{ background: 'var(--surface-color-hover)' }}></div>
        <div className="stat-info" style={{ flex: 1 }}>
          <div style={{ height: '14px', width: '60%', background: 'var(--surface-color-hover)', marginBottom: '8px', borderRadius: '4px' }}></div>
          <div style={{ height: '24px', width: '40%', background: 'var(--surface-color-hover)', borderRadius: '4px' }}></div>
        </div>
      </div>
    );
  }
  
  if (type === 'chart') {
    return (
      <div className="card chart-card skeleton-pulse">
        <div style={{ height: '24px', width: '40%', background: 'var(--surface-color-hover)', marginBottom: '1rem', borderRadius: '4px' }}></div>
        <div style={{ flex: 1, background: 'var(--surface-color-hover)', borderRadius: '8px' }}></div>
      </div>
    );
  }

  return <div className="skeleton-pulse" style={{ height: '100px', background: 'var(--surface-color-hover)', borderRadius: '8px' }}></div>;
};

export default SkeletonLoader;
