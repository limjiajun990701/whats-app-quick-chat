
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
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant={isUsername ? "outline" : "default"} 
              onClick={isUsername ? handleInputTypeToggle : undefined}
              className="flex-1 mr-2"
            >
              Phone Number
            </Button>
            <Button 
              variant={isUsername ? "default" : "outline"} 
              onClick={!isUsername ? handleInputTypeToggle : undefined}
              className="flex-1"
            >
              Username
            </Button>
          </div>

          {isUsername ? (
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Telegram Username
              </label>
              <Input
                id="username"
                placeholder="@username"
                value={phoneOrUsername}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the Telegram username (e.g., @telegramuser)
              </p>
            </div>
          ) : (
            <PhoneInput value={phoneOrUsername} onChange={handleInputChange} />
          )}
          
          <MessageInput value={message} onChange={handleMessageChange} />
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Link</TabsTrigger>
              <TabsTrigger value="qr">QR Code</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="space-y-4">
              <div className="flex mt-4">
                <Input
                  readOnly
                  value={telegramLink}
                  placeholder="Generated Telegram link will appear here"
                  className="flex-grow mr-2"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopy}
                  disabled={!isLinkValid}
                >
                  Copy
                </Button>
              </div>
              <Button 
                className="w-full" 
                onClick={handleOpenChat}
                disabled={!isLinkValid}
              >
                Open Chat
              </Button>
            </TabsContent>
            <TabsContent value="qr">
              <QRCodeGenerator url={telegramLink} isActive={activeTab === 'qr' && isLinkValid} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelegramLinkGenerator;
