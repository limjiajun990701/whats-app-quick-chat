
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { formatPhoneNumber, generateTelegramLink, copyToClipboard } from '@/utils/telegramUtils';
import PhoneInput from './PhoneInput';
import MessageInput from './MessageInput';
import QRCodeGenerator from './QRCodeGenerator';

const TelegramLinkGenerator: React.FC = () => {
  const [phoneOrUsername, setPhoneOrUsername] = useState('');
  const [isUsername, setIsUsername] = useState(false);
  const [message, setMessage] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [activeTab, setActiveTab] = useState('link');
  const { toast } = useToast();

  // Generate Telegram link whenever inputs change
  useEffect(() => {
    if (phoneOrUsername.trim()) {
      const formatted = isUsername ? phoneOrUsername : formatPhoneNumber(phoneOrUsername);
      const link = generateTelegramLink(formatted, message);
      setTelegramLink(link);
    } else {
      setTelegramLink('');
    }
  }, [phoneOrUsername, message, isUsername]);

  const handleInputChange = (value: string) => {
    setPhoneOrUsername(value);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const handleInputTypeToggle = () => {
    setIsUsername(!isUsername);
    setPhoneOrUsername(''); // Clear input on type change
  };

  const handleCopy = async () => {
    if (telegramLink) {
      const success = await copyToClipboard(telegramLink);
      if (success) {
        toast({
          title: "Copied to clipboard!",
          description: "The Telegram link has been copied",
        });
      } else {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard. Please try manually.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenChat = () => {
    if (telegramLink) {
      window.open(telegramLink, '_blank');
    }
  };

  const isLinkValid = telegramLink && phoneOrUsername.trim().length > 0;

  return (
    <Card className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-xl border-white/20 shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant={isUsername ? "outline" : "default"} 
              onClick={isUsername ? handleInputTypeToggle : undefined}
              className={`flex-1 mr-2 font-medium ${isUsername ? 'border-[#0088cc]/70 text-white bg-transparent hover:bg-[#0088cc]/20' : 'bg-[#0088cc] hover:bg-[#0099dd] shadow-md'}`}
            >
              Phone Number
            </Button>
            <Button 
              variant={isUsername ? "default" : "outline"} 
              onClick={!isUsername ? handleInputTypeToggle : undefined}
              className={`flex-1 font-medium ${!isUsername ? 'border-[#0088cc]/70 text-white bg-transparent hover:bg-[#0088cc]/20' : 'bg-[#0088cc] hover:bg-[#0099dd] shadow-md'}`}
            >
              Username
            </Button>
          </div>

          {isUsername ? (
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none text-white/90 block mb-1.5">
                Telegram Username
              </label>
              <Input
                id="username"
                placeholder="@username"
                value={phoneOrUsername}
                onChange={(e) => handleInputChange(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus-visible:ring-[#0088cc]/50"
              />
              <p className="text-xs text-white/70 mt-1">
                Enter the Telegram username (e.g., @telegramuser)
              </p>
            </div>
          ) : (
            <PhoneInput 
              value={phoneOrUsername} 
              onChange={handleInputChange}
              className="bg-white/20 border-white/30 text-white focus-visible:ring-[#0088cc]/50" 
            />
          )}
          
          <MessageInput 
            value={message} 
            onChange={handleMessageChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus-visible:ring-[#0088cc]/50" 
          />
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
              <TabsTrigger value="link" className="data-[state=active]:bg-[#0088cc] text-white data-[state=active]:text-white">Link</TabsTrigger>
              <TabsTrigger value="qr" className="data-[state=active]:bg-[#0088cc] text-white data-[state=active]:text-white">QR Code</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="space-y-4 pt-4">
              <div className="flex mt-2">
                <Input
                  readOnly
                  value={telegramLink}
                  placeholder="Generated Telegram link will appear here"
                  className="flex-grow mr-2 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus-visible:ring-[#0088cc]/50"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopy}
                  disabled={!isLinkValid}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  Copy
                </Button>
              </div>
              <Button 
                className="w-full bg-[#0088cc] hover:bg-[#0099dd] text-white font-medium shadow-md" 
                onClick={handleOpenChat}
                disabled={!isLinkValid}
                size="lg"
              >
                Open Chat
              </Button>
            </TabsContent>
            <TabsContent value="qr" className="pt-4">
              <QRCodeGenerator url={telegramLink} isActive={activeTab === 'qr' && isLinkValid} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelegramLinkGenerator;
