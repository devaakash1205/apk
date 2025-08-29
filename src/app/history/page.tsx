"use client";

import { useApp } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, History as HistoryIcon } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { format, isToday, isYesterday, parseISO } from "date-fns";

const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const isSuccess = tx.status === 'SUCCESS';
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${isSuccess ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
            <ArrowUpRight className={`w-5 h-5 ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`} />
          </div>
          <div>
            <p className="font-semibold">{tx.receiver}</p>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(tx.date), "h:mm a")} • {tx.status}
            </p>
          </div>
        </div>
        <p className={`font-semibold text-lg ${isSuccess ? "text-foreground" : "text-muted-foreground line-through"}`}>
          - ₹{tx.amount.toLocaleString('en-IN')}
        </p>
      </CardContent>
    </Card>
  );
};

export default function HistoryPage() {
  const { transactions } = useApp();

  const groupedTransactions = transactions.reduce((acc, tx) => {
    const date = parseISO(tx.date);
    let key;
    if (isToday(date)) {
      key = "Today";
    } else if (isYesterday(date)) {
      key = "Yesterday";
    } else {
      key = format(date, "MMMM d, yyyy");
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-primary">Transaction History</h1>
      {Object.keys(groupedTransactions).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, txs]) => (
            <div key={date}>
              <h2 className="text-sm font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">{date}</h2>
              <div className="space-y-3">
                {txs.map((tx) => (
                  <TransactionItem key={tx.id} tx={tx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <HistoryIcon className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold">No Transactions Yet</h2>
            <p className="text-muted-foreground">Your recent transactions will appear here.</p>
        </div>
      )}
    </div>
  );
}
