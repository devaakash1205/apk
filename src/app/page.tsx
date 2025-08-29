"use client";

import { Header } from '@/components/home/Header';
import { ActionsGrid } from '@/components/home/ActionsGrid';
import { Section } from '@/components/home/Section';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { BannerCarousel } from '@/components/home/BannerCarousel';
import { BillPaymentsGrid } from '@/components/home/BillPaymentsGrid';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-background">
      <Header />
      <div className="flex-1 space-y-6 p-4">
        <Section title="Transfer Money">
          <ActionsGrid />
        </Section>
        
        <BannerCarousel />

        <Section title="Recharge & Pay Bills">
          <BillPaymentsGrid />
        </Section>

        <Section title="Sponsored Links">
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <Image src="https://picsum.photos/400/200?q=1" alt="Sponsored 1" width={400} height={200} className="w-full h-auto object-cover" data-ai-hint="online shopping" />
              <CardContent className="p-2">
                <p className="text-sm font-medium">Flat 50% Off</p>
                <p className="text-xs text-muted-foreground">On your first order</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
               <Image src="https://picsum.photos/400/200?q=2" alt="Sponsored 2" width={400} height={200} className="w-full h-auto object-cover" data-ai-hint="food delivery" />
              <CardContent className="p-2">
                <p className="text-sm font-medium">Get Free Delivery</p>
                <p className="text-xs text-muted-foreground">Use code: FREEDEL</p>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}
