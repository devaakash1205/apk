"use client";

import { useApp } from "@/contexts/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Phone, Shield, ChevronRight, LogOut, Settings } from "lucide-react";

export default function ProfilePage() {
  const { user } = useApp();

  const profileItems = [
    { icon: User, text: "Edit Profile", action: () => {} },
    { icon: Shield, text: "Security", action: () => {} },
    { icon: Settings, text: "Settings", action: () => {} },
    { icon: LogOut, text: "Logout", action: () => {}, isDestructive: true },
  ];

  return (
    <div className="p-4 space-y-6">
      <header className="flex flex-col items-center pt-8 space-y-2">
        <Avatar className="w-24 h-24 border-4 border-primary/20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.mobile}</p>
      </header>

      <Card>
        <CardContent className="p-0">
          {profileItems.map((item, index) => (
            <div
              key={item.text}
              className={`flex items-center p-4 cursor-pointer hover:bg-muted ${index !== profileItems.length - 1 ? 'border-b' : ''} ${item.isDestructive ? 'text-destructive' : ''}`}
              onClick={item.action}
            >
              <item.icon className="w-5 h-5 mr-4" />
              <span className="flex-1 font-medium">{item.text}</span>
              {!item.isDestructive && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
