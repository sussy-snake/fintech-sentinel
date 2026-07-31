'use client';

import React from 'react';
import { useWidgetSDK } from '@nitrostack/widgets';

// Define the shape of the data coming from the backend
interface FraudData {
  customer: string;
  amount: number;
  merchant: string;
  location: string;
  device: string;
  verdict: string;
  riskScore: number;
}

export default function Track1Widget() {
  // CORRECT NitroStack Data Fetching (Fixing ChatGPT's error)
  const { getToolOutput, isReady } = useWidgetSDK();
  const output = getToolOutput<FraudData>();

  if (!isReady) {
    return <div style={{ color: 'white', padding: 20 }}>Connecting to secure database...</div>;
  }

  if (!output) {
     return <div style={{ color: 'white', padding: 20 }}>No case data found.</div>;
  }

  const isHighRisk = output.riskScore > 50;

  return (
    <div style={{
      padding: 20,
      border: `2px solid ${isHighRisk ? '#EF4444' : '#10B981'}`,
      borderRadius: 12,
      background: '#0F172A',
      color: '#F8FAFC',
      fontFamily: 'sans-serif',
      maxWidth: '400px'
    }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#38BDF8' }}>🕵️ Fraud Investigation</h2>
      
      <p style={{ margin: '8px 0' }}><b style={{ color: '#94A3B8' }}>Customer:</b> {output.customer}</p>
      <p style={{ margin: '8px 0' }}><b style={{ color: '#94A3B8' }}>Amount:</b> ₹{output.amount}</p>
      <p style={{ margin: '8px 0' }}><b style={{ color: '#94A3B8' }}>Merchant:</b> {output.merchant}</p>
      <p style={{ margin: '8px 0' }}><b style={{ color: '#94A3B8' }}>Location:</b> {output.location}</p>
      <p style={{ margin: '8px 0' }}><b style={{ color: '#94A3B8' }}>Device:</b> {output.device}</p>
      
      <h3 style={{ 
        color: isHighRisk ? '#EF4444' : '#10B981', 
        marginTop: '20px',
        marginBottom: '4px'
      }}>
        {output.verdict}
      </h3>
      <p style={{ margin: 0, fontSize: '14px', color: '#94A3B8' }}>
        Risk Score: {output.riskScore}/100
      </p>
    </div>
  );
}