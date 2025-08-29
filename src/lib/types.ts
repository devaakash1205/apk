export interface User {
  name: string;
  mobile: string;
  avatarUrl: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  holderName: string;
  upiId: string;
  balance: number;
}

export type TransactionStatus = 'SUCCESS' | 'FAILURE' | 'PENDING';

export type PaymentMethod = 'UPI' | 'QR' | 'CONTACT';

export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  amount: number;
  receiver: string; // UPI ID or Contact Name
  senderUpiId: string;
  status: TransactionStatus;
  note?: string;
  method: PaymentMethod;
}

export interface Contact {
    name: string;
    upiId: string;
}
