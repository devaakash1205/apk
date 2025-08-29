"use client";

import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Header } from '@/components/home/Header';
import { ActionsGrid } from '@/components/home/ActionsGrid';
import { Section } from '@/components/home/Section';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, IndianRupee } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col bg-background">
      <Header />
      <div className="flex-1 space-y-4 p-4">
        <Section title="Transfer Money">
          <ActionsGrid />
        </Section>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Check Bank Balance</p>
                <p className="text-sm text-muted-foreground">Free and instant</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Check</Button>
          </CardContent>
        </Card>
        
        <Section title="Recharge & Pay Bills">
          <div className="grid grid-cols-4 gap-4 text-center">
            {['Recharge', 'DTH', 'Electricity', 'Credit Card', 'Loan', 'Book Cylinder', 'Piped Gas', 'See All'].map((item) => (
               <div key={item} className="flex flex-col items-center gap-1">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-primary" />
                 </div>
                 <p className="text-xs font-medium text-foreground">{item}</p>
               </div>
            ))}
          </div>
        </Section>

        <Section title="Sponsored Links">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <Image src="https://picsum.photos/400/200?q=1" alt="Sponsored 1" width={400} height={200} className="rounded-t-lg" data-ai-hint="online shopping" />
              <CardContent className="p-2">
                <p className="text-sm font-medium">Flat 50% Off</p>
                <p className="text-xs text-muted-foreground">On your first order</p>
              </CardContent>
            </Card>
            <Card>
               <Image src="https://picsum.photos/400/200?q=2" alt="Sponsored 2" width={400} height={200} className="rounded-t-lg" data-ai-hint="food delivery" />
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
