"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PhonePeLogo } from '@/components/icons/PhonePeLogo';
import { ShieldCheck, MessageSquare, Camera } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const slides = [
  {
    icon: PhonePeLogo,
    title: 'Welcome to PhonePe',
    description: 'India\'s most trusted digital payment app. Safe, fast and easy.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe and Secure',
    description: 'PhonePe uses a secure UPI infrastructure to keep your money safe.',
  },
  {
    icon: MessageSquare,
    title: 'Essential Permissions',
    description: 'We need a few permissions to provide a seamless experience.',
    permissions: [
        { icon: MessageSquare, name: 'SMS', reason: 'To verify your mobile number for UPI.' },
        { icon: Camera, name: 'Camera', reason: 'To scan QR codes for payments.' },
    ]
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboardingComplete } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setOnboardingComplete(true);
      router.push('/');
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="flex flex-col h-full bg-primary text-primary-foreground p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="mb-8"
          >
            <Icon className="h-24 w-24 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xs">
            {slide.description}
          </p>

          {slide.permissions && (
            <div className="w-full text-left space-y-4 bg-white/10 p-4 rounded-lg">
                {slide.permissions.map(p => {
                    const PermissionIcon = p.icon;
                    return (
                        <div key={p.name} className="flex items-start gap-4">
                            <PermissionIcon className="h-6 w-6 text-white/80 mt-1" />
                            <div>
                                <h3 className="font-semibold">{p.name}</h3>
                                <p className="text-sm text-white/70">{p.reason}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      <div className="py-4">
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          className="w-full h-12 text-lg bg-white text-primary hover:bg-white/90"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
