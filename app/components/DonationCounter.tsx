'use client';

import { useEffect, useState } from 'react';

/**
 * Dynamic donation counter component
 * Displays total collected amount with animated counting effect
 */
export default function DonationCounter() {
  const [displayAmount, setDisplayAmount] = useState(2908323356);
  
  // In a real app, this would fetch from an API
  const targetAmount = 2908323356;
  
  useEffect(() => {
    // Simulate real-time updates (in production, this would come from an API/WebSocket)
    const interval = setInterval(() => {
      // Random small increment to simulate live donations
      setDisplayAmount((prev) => prev + Math.floor(Math.random() * 100));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-blue-900 text-white text-center py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="text-sm md:text-base font-medium">
          TOTAL COLLECTED: <span className="font-bold">{formatAmount(displayAmount)}</span>
        </span>
      </div>
    </div>
  );
}

