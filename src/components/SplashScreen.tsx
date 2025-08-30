import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Globe } from 'lucide-react';
import { PhonePeLogoText } from './icons/PhonePeLogoText';

const securityFeatures = [
  { icon: CheckCircle, text: 'PCI DSS COMPLIANT' },
  { icon: ShieldCheck, text: '100% SECURED' },
  { icon: Globe, text: 'ISO 27001 CERTIFIED' },
];

export function SplashScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-background p-8">
      <div />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg
            width="50%"
            height="50%"
            viewBox="0 0 50 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.6537 25.1311V16.7131H49.5V10.6051H39.6537V0.5H30.5657V10.6051H20.7197V16.7131H30.5657V27.5311C30.5657 32.8831 26.6957 36.3151 22.1837 36.3151C20.6057 36.3151 18.9917 35.9131 17.5637 35.2471L14.7437 42.4591C17.2037 43.6111 20.0237 44.1751 22.8437 44.1751C31.5677 44.1751 39.6537 38.3191 39.6537 27.8131V25.1311Z"
              fill="white"
            />
            <path
              d="M0.5 45.9338H9.588V55.5H18.676V45.9338H28.522V39.8258H0.5V45.9338Z"
              fill="white"
            />
          </svg>
        </div>
        <PhonePeLogoText className="h-10 w-auto text-primary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-center gap-4 md:gap-8"
      >
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex flex-col items-center gap-1 text-center">
              <Icon className="h-5 w-5 text-green-600" />
              <p className="text-xs text-muted-foreground font-medium max-w-[80px]">{feature.text}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
