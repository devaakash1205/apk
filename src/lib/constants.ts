import type { User, BankAccount, Contact } from './types';

export const MOCK_USER: User = {
  name: 'Alex Doe',
  mobile: '+91 98765 43210',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
};

export const MOCK_ACCOUNTS: BankAccount[] = [
  {
    id: 'acc_1',
    bankName: 'Mock Bank of India',
    accountNumber: '**** **** 1234',
    ifsc: 'MKBK0001234',
    holderName: 'Alex Doe',
    upiId: 'alex@mockbank',
    balance: 50000.75,
  },
  {
    id: 'acc_2',
    bankName: 'Virtual Credit Bank',
    accountNumber: '**** **** 5678',
    ifsc: 'VCBL0005678',
    holderName: 'Alex Doe',
    upiId: 'alex.doe@vcbank',
    balance: 125000.00,
  },
];

export const MOCK_CONTACTS: Contact[] = [
    { name: 'Jane Smith', upiId: 'jane.smith@mockbank' },
    { name: 'John Appleseed', upiId: 'john.apple@vcbank' },
    { name: 'Sam Wilson', upiId: 'samw@mockbank' },
    { name: 'Peter Parker', upiId: 'spidey@herobank' },
];
