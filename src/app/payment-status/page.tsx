"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function PaymentStatusContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { getTransactionById } = useApp();
    const transactionId = searchParams.get('id');
    
    if (!transactionId) {
        return <div className="text-center text-red-500">Invalid transaction.</div>;
    }

    const transaction = getTransactionById(transactionId);
    
    if (!transaction) {
        return <div className="text-center text-red-500">Transaction not found.</div>;
    }

    const isSuccess = transaction.status === 'SUCCESS';

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            {isSuccess ? (
                <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
            ) : (
                <XCircle className="w-24 h-24 text-destructive mb-6" />
            )}
            
            <h1 className="text-2xl font-bold mb-2">
                {isSuccess ? 'Payment Successful' : 'Payment Failed'}
            </h1>
            
            <p className="text-muted-foreground mb-4">
                {isSuccess 
                    ? `Paid to ${transaction.receiver}`
                    : "Your payment could not be processed."
                }
            </p>
            
            <p className="text-4xl font-bold mb-8">
                ₹{transaction.amount.toLocaleString('en-IN')}
            </p>
            
            <div className="text-sm text-muted-foreground">
                <p>Transaction ID: {transaction.id}</p>
                <p>{new Date(transaction.date).toLocaleString()}</p>
            </div>
            
            <div className="mt-auto w-full space-y-2">
                <Button onClick={() => router.push('/')} className="w-full bg-primary hover:bg-primary/90">
                    Done
                </Button>
                <Button onClick={() => router.back()} variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Make Another Payment
                </Button>
            </div>
        </div>
    );
}

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentStatusContent />
        </Suspense>
    )
}
