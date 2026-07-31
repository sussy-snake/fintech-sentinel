'use client';

import React from 'react';

interface WidgetProps {
  data?: {
    targetName?: string;
    amount?: number;
    timestamp?: string;
    healthScore?: number;
    status?: string;
    metrics?: {
      latency?: string;
      complianceCheck?: string;
      confidenceScore?: string;
    };
  };
}

export default function Track1Widget({ data }: WidgetProps) {
  const isHighRisk = data?.status === 'HIGH_RISK';

  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      background: '#0F172A',
      color: '#F8FAFC',
      border: `1px solid ${isHighRisk ? '#EF4444' : '#10B981'}`,
      fontFamily: 'sans-serif',
      maxWidth: '450px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#38BDF8' }}>
          📊 Track 01 Intelligence
        </h3>
        <span style={{
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          background: isHighRisk ? '#7F1D1D' : '#064E3B',
          color: isHighRisk ? '#FCA5A5' : '#6EE7B7'
        }}>
          {data?.status || 'ACTIVE'}
        </span>
      </div>

      <hr style={{ borderColor: '#334155', margin: '14px 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
        <div>
          <p style={{ margin: 0, color: '#94A3B8' }}>Target:</p>
          <strong>{data?.targetName || 'N/A'}</strong>
        </div>
        <div>
          <p style={{ margin: 0, color: '#94A3B8' }}>Risk Score:</p>
          <strong style={{ color: isHighRisk ? '#EF4444' : '#10B981' }}>
            {data?.healthScore ?? 85}/100
          </strong>
        </div>
      </div>
    </div>
  );
}