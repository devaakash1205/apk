"use client";

import Link from 'next/link';
import { Users, Banknote, QrCode, ArrowRightLeft, IndianRupee } from "lucide-react";
import { Card, CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';

const actions = [
  { href: "/pay?method=contact", label: "To Mobile", icon: Users },
  { href: "/pay?method=upi", label: "To Bank/UPI ID", icon: Banknote },
  { href: "/pay", label: "To Self Account", icon: ArrowRightLeft },
  { href: "/balance", label: "Check Balance", icon: IndianRupee },
];

export function ActionsGrid() {
  const router = useRouter();

  const handleActionClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Special handling for QR scan can be added here
    if (href.includes('qr')) {
        router.push('/qr-scanner');
    } else {
        router.push(href);
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
            {actions.map((action) => (
            <Link href={action.href} key={action.label} onClick={(e) => handleActionClick(e, action.href)} className="flex flex-col items-center justify-start gap-2 text-foreground hover:text-primary transition-colors">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <action.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium h-8">{action.label}</p>
            </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
