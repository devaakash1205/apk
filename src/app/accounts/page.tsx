"use client";

import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Banknote, Plus, QrCode, Trash2, IndianRupee, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import QRCode from "qrcode.react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BankAccount } from "@/lib/types";

const accountSchema = z.object({
  holderName: z.string().min(1, "Holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  ifsc: z.string().min(1, "IFSC code is required"),
  upiId: z.string().email("Invalid UPI ID format").or(z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")),
});

function AccountForm({ account, onSave, onOpenChange }: { account?: BankAccount; onSave: () => void; onOpenChange: (open:boolean) => void }) {
  const { addAccount, updateAccount } = useApp();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: account || { holderName: "", bankName: "", accountNumber: "", ifsc: "", upiId: "" },
  });

  const onSubmit = (values: z.infer<typeof accountSchema>) => {
    if (account) {
      updateAccount({ ...account, ...values });
      toast({ title: "Success", description: "Account updated successfully." });
    } else {
      const result = addAccount(values);
      if (result.success) {
        toast({ title: "Success", description: result.message });
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    }
    onSave();
    form.reset();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="holderName" render={({ field }) => (
          <FormItem><FormLabel>Account Holder Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="bankName" render={({ field }) => (
          <FormItem><FormLabel>Bank Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="accountNumber" render={({ field }) => (
          <FormItem><FormLabel>Account Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="ifsc" render={({ field }) => (
          <FormItem><FormLabel>IFSC Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="upiId" render={({ field }) => (
          <FormItem><FormLabel>UPI ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">{account ? "Save Changes" : "Add Account"}</Button>
      </form>
    </Form>
  );
}

function BalanceEditor({ account, onOpenChange }: { account: BankAccount; onOpenChange: (open: boolean) => void }) {
    const { updateBalance } = useApp();
    const [newBalance, setNewBalance] = useState(account.balance);
    const { toast } = useToast();

    const handleSave = () => {
        updateBalance(account.id, Number(newBalance));
        toast({ title: "Success", description: "Balance updated." });
        onOpenChange(false);
    }

    return (
        <div className="space-y-4">
            <FormItem>
                <FormLabel>New Balance for {account.bankName}</FormLabel>
                <FormControl>
                    <Input type="number" value={newBalance} onChange={(e) => setNewBalance(Number(e.target.value))} />
                </FormControl>
            </FormItem>
            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">Save Balance</Button>
        </div>
    )
}


export default function AccountsPage() {
  const { accounts, deleteAccount } = useApp();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | undefined>(undefined);
  const [editingBalance, setEditingBalance] = useState<BankAccount | undefined>(undefined);
  const [qrAccount, setQrAccount] = useState<BankAccount | undefined>(undefined);
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this account?")) {
      deleteAccount(id);
      toast({ title: "Success", description: "Account deleted." });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">My Money</h1>
         <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Add a New Bank Account</DialogTitle></DialogHeader>
                <AccountForm onSave={() => setIsAddOpen(false)} onOpenChange={setIsAddOpen} />
            </DialogContent>
        </Dialog>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-foreground">Bank Accounts</h2>
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card key={account.id} className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg text-primary">{account.bankName}</CardTitle>
                        <CardDescription>{account.accountNumber}</CardDescription>
                    </div>
                    <Banknote className="w-8 h-8 text-primary/50" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold">₹{account.balance.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2">
                         <Dialog onOpenChange={(open) => !open && setEditingBalance(undefined)}>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingBalance(account)}><Edit className="w-4 h-4"/></Button></DialogTrigger>
                             {editingBalance?.id === account.id && 
                                <DialogContent>
                                    <DialogHeader><DialogTitle>Edit Balance</DialogTitle></DialogHeader>
                                    <BalanceEditor account={account} onOpenChange={(open) => !open && setEditingBalance(undefined)} />
                                </DialogContent>
                             }
                        </Dialog>
                        <Dialog onOpenChange={(open) => !open && setQrAccount(undefined)}>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setQrAccount(account)}><QrCode className="w-4 h-4"/></Button></DialogTrigger>
                             {qrAccount?.id === account.id && 
                                <DialogContent>
                                    <DialogHeader><DialogTitle>UPI QR Code</DialogTitle></DialogHeader>
                                    <div className="flex flex-col items-center justify-center p-4 gap-4">
                                        <QRCode value={`upi://pay?pa=${account.upiId}&pn=${account.holderName}`} size={200} />
                                        <p className="font-semibold">{account.holderName}</p>
                                        <p className="text-muted-foreground">{account.upiId}</p>
                                    </div>
                                </DialogContent>
                             }
                        </Dialog>
                         <Dialog onOpenChange={(open) => !open && setEditingAccount(undefined)}>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingAccount(account)}><Edit className="w-4 h-4 text-blue-500"/></Button></DialogTrigger>
                             {editingAccount?.id === account.id && 
                                <DialogContent>
                                    <DialogHeader><DialogTitle>Edit Account</DialogTitle></DialogHeader>
                                    <AccountForm account={account} onSave={() => setEditingAccount(undefined)} onOpenChange={(open) => !open && setEditingAccount(undefined)} />
                                </DialogContent>
                             }
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(account.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
           {accounts.length === 0 && (
                <Card className="text-center p-8 border-dashed">
                    <p className="text-muted-foreground">No bank accounts added yet.</p>
                    <p className="text-muted-foreground">Click "Add Account" to get started.</p>
                </Card>
            )}
        </div>
      </section>
    </div>
  );
}
