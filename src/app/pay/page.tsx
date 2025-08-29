"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, QrCode, Banknote, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PaymentMethod } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export default function PayPage() {
  const { accounts, contacts, makePayment } = useApp();
  const router = useRouter();
  const { toast } = useToast();
  
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [senderAccountId, setSenderAccountId] = useState<string | undefined>(accounts[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  const handlePayment = () => {
    if (!senderAccountId || !receiver || !amount) {
      toast({ title: 'Error', description: 'Please fill all required fields.', variant: 'destructive' });
      return;
    }
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        toast({ title: 'Error', description: 'Please enter a valid amount.', variant: 'destructive' });
        return;
    }

    const { success, transactionId } = makePayment(senderAccountId, receiver, paymentAmount, note, paymentMethod);
    router.push(`/payment-status?id=${transactionId}`);
  };

  const handleContactClick = (contactUpiId: string) => {
    setReceiver(contactUpiId);
    setPaymentMethod('CONTACT');
    // Switch to first tab to show the pre-filled UPI ID
    // This requires a way to control the active tab, for simplicity we'll just set receiver
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold text-primary mb-4">Send Money</h1>
      
      <Tabs defaultValue="upi" className="w-full" onValueChange={(val) => setPaymentMethod(val.toUpperCase() as PaymentMethod)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upi"><Banknote className="w-4 h-4 mr-1" />UPI ID</TabsTrigger>
          <TabsTrigger value="contact"><User className="w-4 h-4 mr-1" />To Contact</TabsTrigger>
          <TabsTrigger value="qr"><QrCode className="w-4 h-4 mr-1"/>Scan QR</TabsTrigger>
        </TabsList>

        <TabsContent value="upi" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="receiver-upi">Receiver's UPI ID</Label>
            <Input id="receiver-upi" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="someone@okbank" />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-2 pt-4">
             <div className="space-y-2">
                {contacts.map(contact => (
                    <Card key={contact.upiId} onClick={() => handleContactClick(contact.upiId)} className="cursor-pointer hover:bg-muted">
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.upiId}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4 pt-4 text-center">
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg">
                <QrCode className="w-16 h-16 text-muted-foreground/50 mb-2"/>
                <p className="text-muted-foreground">QR scanning is not supported in this web prototype.</p>
                <p className="text-sm text-muted-foreground">Please enter UPI ID manually.</p>
            </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-auto space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
             <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="pl-10 text-lg"/>
             </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What's this for?" />
          </div>
          
          <div className="space-y-2">
            <Label>Pay from</Label>
            <Select onValueChange={setSenderAccountId} defaultValue={senderAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(acc => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <div className="flex flex-col">
                        <span>{acc.bankName}</span>
                        <span className="text-xs text-muted-foreground">Balance: ₹{acc.balance.toLocaleString('en-IN')}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        
        <Button onClick={handlePayment} className="w-full bg-primary hover:bg-primary/90 text-lg h-12" disabled={!senderAccountId}>
          Send
        </Button>
      </div>
    </div>
  );
}
