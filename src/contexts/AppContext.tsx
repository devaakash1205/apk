"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { BankAccount, Transaction, User, Contact, TransactionStatus, PaymentMethod } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { MOCK_CONTACTS, MOCK_USER, MOCK_ACCOUNTS } from '@/lib/constants';

interface AppContextType {
  isAppLoading: boolean;
  isOnboardingComplete: boolean;
  setOnboardingComplete: (status: boolean) => void;
  user: User;
  updateUser: (user: User) => void;
  accounts: BankAccount[];
  transactions: Transaction[];
  contacts: Contact[];
  addAccount: (account: Omit<BankAccount, 'id' | 'balance'>) => { success: boolean; message: string };
  updateAccount: (account: BankAccount) => void;
  deleteAccount: (id: string) => void;
  updateBalance: (id: string, newBalance: number) => void;
  makePayment: (
    senderAccountId: string, 
    receiver: string, 
    amount: number, 
    note: string,
    method: PaymentMethod
  ) => { success: boolean; transactionId: string };
  getAccountById: (id: string) => BankAccount | undefined;
  getTransactionById: (id: string) => Transaction | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isOnboardingComplete, setOnboardingComplete] = useLocalStorage<boolean>('onboardingComplete', false);
  const [user, setUser] = useLocalStorage<User>('user', MOCK_USER);
  const [accounts, setAccounts] = useLocalStorage<BankAccount[]>('accounts', MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', MOCK_CONTACTS);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
        setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };
  
  const addAccount = (accountData: Omit<BankAccount, 'id' | 'balance'>) => {
    const upiExists = accounts.some(acc => acc.upiId === accountData.upiId);
    if (upiExists) {
        return { success: false, message: 'UPI ID already exists.' };
    }
    const newAccount: BankAccount = {
      id: crypto.randomUUID(),
      balance: 10000, // Default balance for new accounts
      ...accountData,
    };
    setAccounts([...accounts, newAccount]);
    return { success: true, message: 'Account added successfully.' };
  };

  const updateAccount = (updatedAccount: BankAccount) => {
    setAccounts(accounts.map(acc => (acc.id === updatedAccount.id ? updatedAccount : acc)));
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const updateBalance = (id: string, newBalance: number) => {
    setAccounts(accounts.map(acc => (acc.id === id ? { ...acc, balance: newBalance } : acc)));
  };
  
  const getAccountById = (id: string) => {
    return accounts.find(acc => acc.id === id);
  };

  const getTransactionById = (id: string) => {
    return transactions.find(tx => tx.id === id);
  }

  const makePayment = (senderAccountId: string, receiver: string, amount: number, note: string, method: PaymentMethod) => {
    const senderAccount = accounts.find(acc => acc.id === senderAccountId);
    if (!senderAccount) {
      return { success: false, transactionId: '' };
    }
    
    let status: TransactionStatus = 'SUCCESS';
    if (senderAccount.balance < amount) {
        status = 'FAILURE';
    }

    const transactionId = crypto.randomUUID();
    const newTransaction: Transaction = {
      id: transactionId,
      date: new Date().toISOString(),
      amount,
      receiver,
      senderUpiId: senderAccount.upiId,
      status,
      note,
      method,
    };

    if (status === 'SUCCESS') {
        const updatedAccounts = accounts.map(acc => {
            if (acc.id === senderAccountId) {
                return { ...acc, balance: acc.balance - amount };
            }
            return acc;
        });
        setAccounts(updatedAccounts);
    }
    
    setTransactions([newTransaction, ...transactions]);

    return { success: status === 'SUCCESS', transactionId };
  };

  const value = {
    isAppLoading,
    isOnboardingComplete,
    setOnboardingComplete,
    user,
    updateUser,
    accounts,
    transactions,
    contacts,
    addAccount,
    updateAccount,
    deleteAccount,
    updateBalance,
    makePayment,
    getAccountById,
    getTransactionById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
