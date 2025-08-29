"use client";

import { useApp } from "@/contexts/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Bell, HelpCircle, ChevronDown } from "lucide-react";
import Link from 'next/link';

export function Header() {
  const { user } = useApp();
  
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-primary text-primary-foreground shadow-md">
      <div className="flex items-center gap-3">
        <Link href="/profile">
            <Avatar className="h-10 w-10 border-2 border-white/50">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </Link>
        <div>
          <div className="flex items-center text-sm">
            <span>Your Location</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <p className="font-semibold">Mumbai, India</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button><Bell className="h-6 w-6" /></button>
        <button><HelpCircle className="h-6 w-6" /></button>
      </div>
    </header>
  );
}
