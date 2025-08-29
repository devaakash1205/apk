"use client";

import { useApp } from "@/contexts/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User, Shield, ChevronRight, LogOut, Settings, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, updateUser } = useApp();
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user.avatarUrl);
  const { toast } = useToast();

  const handleAvatarUpdate = () => {
    updateUser({ ...user, avatarUrl: newAvatarUrl });
    toast({ title: "Success", description: "Profile picture updated!" });
    setIsAvatarDialogOpen(false);
  };

  const profileItems = [
    { icon: User, text: "Edit Profile", action: () => {} },
    { icon: Shield, text: "Security", action: () => {} },
    { icon: Settings, text: "Settings", action: () => {} },
    { icon: LogOut, text: "Logout", action: () => {}, isDestructive: true },
  ];

  return (
    <div className="p-4 space-y-6">
      <header className="flex flex-col items-center pt-8 space-y-2">
        <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
          <DialogTrigger asChild>
             <div className="relative cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar-url">Image URL</Label>
                <Input
                  id="avatar-url"
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
              <Button onClick={handleAvatarUpdate} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
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
