'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

/**
 * Donate page - Shows projects first, then donation form when project is selected
 */
type PaymentMethod = 'card' | 'bank' | 'crypto' | null;

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Emergency Housing Support',
    category: 'Emergency Relief',
    description: 'Providing immediate housing assistance to families displaced by crisis situations. This project helps secure temporary and permanent housing solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    targetAmount: 500000,
    currentAmount: 342000,
    status: 'active',
  },
  {
    id: '2',
    title: 'Medical Equipment for Rural Clinics',
    category: 'Medical Aid',
    description: 'Supplying essential medical equipment to rural healthcare facilities to improve access to quality medical care in underserved communities.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    targetAmount: 750000,
    currentAmount: 589000,
    status: 'active',
  },
  {
    id: '3',
    title: 'Community Center Construction',
    category: 'Community Development',
    description: 'Building a new community center to serve as a hub for social services, educational programs, and community gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    targetAmount: 1200000,
    currentAmount: 950000,
    status: 'active',
  },
  {
    id: '4',
    title: 'Scholarship Program for Students',
    category: 'Education & Training',
    description: 'Funding scholarships for students from underserved backgrounds to pursue higher education and vocational training.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    targetAmount: 300000,
    currentAmount: 300000,
    status: 'completed',
  },
  {
    id: '5',
    title: 'Infrastructure Repair Initiative',
    category: 'Infrastructure Rebuild',
    description: 'Repairing and upgrading essential infrastructure including roads, bridges, and public utilities to improve community access and safety.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    targetAmount: 2000000,
    currentAmount: 1250000,
    status: 'active',
  },
  {
    id: '6',
    title: 'Clean Water Access Program',
    category: 'Community Development',
    description: 'Installing clean water systems in communities without access to safe drinking water, improving health and quality of life.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    targetAmount: 600000,
    currentAmount: 423000,
    status: 'active',
  },
];

function DonatePageContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    // Check if project ID is in URL
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject(project);
        setShowForm(true);
      }
    }
  }, [projectId]);

  const presetAmounts = ['25', '50', '100', '250', '500', '1000'];

  // Bank account details (dummy)
  const bankAccounts = {
    usd: {
      accountName: 'HopeForUA Foundation',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'International Trust Bank',
      swift: 'ITBANKUS33',
      iban: 'US33ITBK0000123456789012',
    },
    eur: {
      accountName: 'HopeForUA Foundation',
      accountNumber: 'EU9876543210',
      bankName: 'European Union Bank',
      swift: 'EUBANKDE33',
      iban: 'DE89370400440532013000',
    },
  };

  // Crypto wallet addresses (dummy)
  const cryptoWallets = {
    bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereum: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5',
    usdt: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5',
    usdc: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleGeneralDonate = () => {
    setSelectedProject(null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAmountClick = (value: string) => {
    setAmount(value);
    setCustomAmount('');
    setIsCustom(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
    setIsCustom(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    console.log('Donation submitted', {
      amount: isCustom ? customAmount : amount,
      paymentMethod,
      project: selectedProject?.id || 'general',
      ...formData,
    });
    alert('Thank you for your donation! In a real application, this would process your payment.');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  // If form should be shown, display it
  if (showForm) {
    return (
      <div className="min-h-screen bg-blue-900 relative overflow-hidden py-12">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.03) 10px,
              rgba(255,255,255,0.03) 20px
            )`
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button - Small white accent */}
          <button
            onClick={() => {
              setShowForm(false);
              setSelectedProject(null);
              window.history.pushState({}, '', '/donate');
            }}
            className="mb-8 text-gray-900 hover:text-blue-900 font-semibold inline-flex items-center text-lg bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          {/* Selected Project Info */}
          {selectedProject && (
            <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 border border-blue-700/50">
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-yellow-400 font-semibold mb-2 uppercase tracking-wide">{selectedProject.category}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">{selectedProject.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {selectedProject ? `Support: ${selectedProject.title}` : 'Make a Donation'}
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
              Your generosity helps us continue our mission. Choose your preferred payment method below.
            </p>
          </div>

          {/* Rest of donation form - keeping existing form code */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Donation Form */}
            <div id="donation-form" className="lg:col-span-2 bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-blue-700/50">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Donation Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Select Amount (USD)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAmountClick(preset)}
                        className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                          amount === preset
                            ? 'border-yellow-400 bg-yellow-400 text-gray-900'
                            : 'border-blue-700 bg-blue-700/50 text-white hover:border-yellow-400 hover:bg-blue-700'
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-white mb-2">
                      Or enter custom amount
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                    />
                  </div>
                  {(amount || customAmount) && (
                    <p className="mt-3 text-lg font-semibold text-yellow-400">
                      Amount: ${isCustom ? customAmount : amount}
                    </p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Select Payment Method *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-yellow-400 bg-yellow-400/20'
                          : 'border-blue-700 bg-blue-800/50 hover:border-yellow-400'
                      }`}
                    >
                      <div className="text-center">
                        <svg className={`w-12 h-12 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-yellow-400' : 'text-blue-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className={`font-semibold ${paymentMethod === 'card' ? 'text-white' : 'text-blue-100'}`}>Credit/Debit Card</div>
                        <div className={`text-sm mt-1 ${paymentMethod === 'card' ? 'text-blue-200' : 'text-blue-300'}`}>Visa, Mastercard, Amex</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'bank'
                          ? 'border-yellow-400 bg-yellow-400/20'
                          : 'border-blue-700 bg-blue-800/50 hover:border-yellow-400'
                      }`}
                    >
                      <div className="text-center">
                        <svg className={`w-12 h-12 mx-auto mb-2 ${paymentMethod === 'bank' ? 'text-yellow-400' : 'text-blue-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <div className={`font-semibold ${paymentMethod === 'bank' ? 'text-white' : 'text-blue-100'}`}>Bank Transfer</div>
                        <div className={`text-sm mt-1 ${paymentMethod === 'bank' ? 'text-blue-200' : 'text-blue-300'}`}>Wire transfer, ACH</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'crypto'
                          ? 'border-yellow-400 bg-yellow-400/20'
                          : 'border-blue-700 bg-blue-800/50 hover:border-yellow-400'
                      }`}
                    >
                      <div className="text-center">
                        <svg className={`w-12 h-12 mx-auto mb-2 ${paymentMethod === 'crypto' ? 'text-yellow-400' : 'text-blue-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className={`font-semibold ${paymentMethod === 'crypto' ? 'text-white' : 'text-blue-100'}`}>Cryptocurrency</div>
                        <div className={`text-sm mt-1 ${paymentMethod === 'crypto' ? 'text-blue-200' : 'text-blue-300'}`}>BTC, ETH, USDT, USDC</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-yellow-400">
                    <h3 className="font-semibold text-gray-900 mb-4">Card Payment</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-yellow-400">
                    <h3 className="font-semibold text-gray-900 mb-4">Bank Transfer Details</h3>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">USD Account</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Account Name:</span>
                          <span className="font-mono font-semibold text-gray-900">{bankAccounts.usd.accountName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Account Number:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-gray-900">{bankAccounts.usd.accountNumber}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankAccounts.usd.accountNumber, 'Account Number')}
                              className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Routing Number:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-gray-900">{bankAccounts.usd.routingNumber}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankAccounts.usd.routingNumber, 'Routing Number')}
                              className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Bank Name:</span>
                          <span className="font-semibold text-gray-900">{bankAccounts.usd.bankName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">SWIFT:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-gray-900">{bankAccounts.usd.swift}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankAccounts.usd.swift, 'SWIFT Code')}
                              className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After making a bank transfer, please email us at donations@hopeforua.org 
                        with your transaction details. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* Crypto Wallet Addresses */}
                {paymentMethod === 'crypto' && (
                  <div className="p-4 bg-white/90 rounded-lg border-2 border-yellow-400">
                    <h3 className="font-semibold text-gray-900 mb-4">Cryptocurrency Wallet Addresses</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Bitcoin (BTC)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cryptoWallets.bitcoin}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cryptoWallets.bitcoin, 'Bitcoin address')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Ethereum (ETH)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cryptoWallets.ethereum}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cryptoWallets.ethereum, 'Ethereum address')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">USDT (Tether)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cryptoWallets.usdt}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cryptoWallets.usdt, 'USDT address')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">USDC (USD Coin)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cryptoWallets.usdc}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cryptoWallets.usdc, 'USDC address')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-gray-800">
                        <strong>Note:</strong> After sending cryptocurrency, please email us at donations@hopeforua.org 
                        with your transaction hash. You can download our impact report from the Reports page.
                      </p>
                    </div>
                  </div>
                )}

                {/* Donor Information */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                    placeholder="Leave a message with your donation..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!amount && !customAmount && !paymentMethod}
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {paymentMethod === 'card' ? 'Complete Donation' : 'Confirm Donation Details'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-blue-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Why Your Donation Matters
                </h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Direct support for individuals and families in need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Transparent use of funds with regular impact reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Tax-deductible donations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Secure and safe payment processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show projects selection first
  return (
    <div className="min-h-screen bg-blue-900 relative overflow-hidden py-12">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.03) 10px,
            rgba(0,0,0,0.03) 20px
          )`
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Support Our Projects
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            Choose a project to support or make a general donation. Every contribution makes a real difference.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => {
            const progress = calculateProgress(project.currentAmount, project.targetAmount);
            return (
              <div
                key={project.id}
                className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-700/50 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg ${
                        project.status === 'active'
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium mb-2 opacity-90">
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-blue-800/60 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-blue-100 mb-5 line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-5">
                    <div className="flex justify-between text-xs font-semibold text-blue-100 mb-2">
                      <span>Raised: {formatCurrency(project.currentAmount)}</span>
                      <span>Goal: {formatCurrency(project.targetAmount)}</span>
                    </div>
                    <div className="w-full bg-blue-900/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-blue-200 mt-2">
                      {progress.toFixed(0)}% funded
                    </div>
                  </div>
                  <button
                    onClick={() => handleProjectSelect(project)}
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-center py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* General Donation Option */}
        <div className="bg-blue-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-10 md:p-12 text-center border border-blue-700/50">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Or Make a General Donation
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Prefer to support our general fund? Your donation will be allocated where it's needed most across all our programs.
          </p>
          <button
            onClick={handleGeneralDonate}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Donate to General Fund
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-blue-900 relative overflow-hidden flex items-center justify-center">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.03) 10px,
              rgba(0,0,0,0.03) 20px
            )`
          }}></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
        <div className="relative text-center">
          <div className="text-2xl text-gray-800 font-semibold">Loading...</div>
        </div>
      </div>
    }>
      <DonatePageContent />
    </Suspense>
  );
}
