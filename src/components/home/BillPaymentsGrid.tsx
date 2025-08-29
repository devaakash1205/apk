"use client";

import Link from 'next/link';
import { Smartphone, MonitorPlay, Lightbulb, CreditCard, Landmark, CircleHelp, GasPump, Grid } from "lucide-react";
import { Card, CardContent } from '../ui/card';

const bills = [
  { href: "/recharge", label: "Recharge", icon: Smartphone },
  { href: "/bills/dth", label: "DTH", icon: MonitorPlay },
  { href: "/bills/electricity", label: "Electricity", icon: Lightbulb },
  { href: "/bills/credit-card", label: "Credit Card", icon: CreditCard },
  { href: "/bills/loan", label: "Loan Repayment", icon: Landmark },
  { href: "/bills/cylinder", label: "Book Cylinder", icon: GasPump },
  { href: "/bills/piped-gas", label: "Piped Gas", icon: CircleHelp },
  { href: "/bills/all", label: "See All", icon: Grid },
];

export function BillPaymentsGrid() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
            {bills.map((item) => (
            <Link href={item.href} key={item.label} className="flex flex-col items-center justify-start gap-2 text-foreground hover:text-primary transition-colors">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium h-8">{item.label}</p>
            </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
