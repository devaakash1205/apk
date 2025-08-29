"use client";

import Link from 'next/link';
import { Users, Banknote, QrCode, ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from '../ui/card';

const actions = [
  { href: "/pay", label: "To Mobile", icon: Users },
  { href: "/pay", label: "To Bank/UPI ID", icon: Banknote },
  { href: "/pay", label: "To Self Account", icon: ArrowRightLeft },
  { href: "/pay", label: "Check Balance", icon: QrCode },
];

export function ActionsGrid() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
            {actions.map((action) => (
            <Link href={action.href} key={action.label} className="flex flex-col items-center gap-2 text-foreground hover:text-primary transition-colors">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <action.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium">{action.label}</p>
            </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
