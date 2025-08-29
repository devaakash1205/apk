import { PhonePeLogo } from '@/components/icons/PhonePeLogo';

export function SplashScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-primary">
      <div className="animate-pulse">
        <PhonePeLogo className="h-24 w-24 text-white" />
      </div>
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-primary-foreground/80">
        <p className="font-bold text-lg">PhonePe</p>
        <p className="text-xs">#IndiaKaPaymentApp</p>
      </div>
    </div>
  );
}
