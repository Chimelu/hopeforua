 import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentDetails extends Document {
  type: 'bank' | 'crypto';
  currency?: string; // For bank: 'usd', 'eur', etc. For crypto: 'bitcoin', 'ethereum', etc.
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  bankName?: string;
  swift?: string;
  iban?: string;
  walletAddress?: string; // For crypto
  network?: string; // For crypto (e.g., 'BTC', 'ETH', 'ERC20')
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentDetailsSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['bank', 'crypto'],
      required: true,
    },
    currency: {
      type: String,
      default: '',
    },
    accountName: {
      type: String,
      default: '',
    },
    accountNumber: {
      type: String,
      default: '',
    },
    routingNumber: {
      type: String,
      default: '',
    },
    bankName: {
      type: String,
      default: '',
    },
    swift: {
      type: String,
      default: '',
    },
    iban: {
      type: String,
      default: '',
    },
    walletAddress: {
      type: String,
      default: '',
    },
    network: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentDetails: Model<IPaymentDetails> =
  mongoose.models.PaymentDetails || mongoose.model<IPaymentDetails>('PaymentDetails', PaymentDetailsSchema);

export default PaymentDetails;

