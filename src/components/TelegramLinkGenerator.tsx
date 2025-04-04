
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
import { Copy, ExternalLink, Send, User, Phone, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-[#051c34]/90 to-[#0a3464]/90 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant={isUsername ? "outline" : "default"} 
              onClick={isUsername ? handleInputTypeToggle : undefined}
              className={`flex-1 mr-2 py-6 font-medium transition-all ${isUsername ? 
                'border-[#0088cc]/70 text-white bg-transparent hover:bg-[#0088cc]/20' : 
                'bg-[#0088cc] hover:bg-[#0099dd] shadow-[0_4px_12px_rgba(0,136,204,0.5)]'}`}
            >
              <Phone className="mr-2 h-5 w-5" />
              Phone Number
            </Button>
            <Button 
              variant={isUsername ? "default" : "outline"} 
              onClick={!isUsername ? handleInputTypeToggle : undefined}
              className={`flex-1 py-6 font-medium transition-all ${!isUsername ? 
                'border-[#0088cc]/70 text-white bg-transparent hover:bg-[#0088cc]/20' : 
                'bg-[#0088cc] hover:bg-[#0099dd] shadow-[0_4px_12px_rgba(0,136,204,0.5)]'}`}
            >
              <User className="mr-2 h-5 w-5" />
              Username
            </Button>
          </div>

          {isUsername ? (
            <div className="space-y-2">
              <label htmlFor="username" className="text-white/90 text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Telegram Username
              </label>
              <Input
                id="username"
                placeholder="@username"
                value={phoneOrUsername}
                onChange={(e) => handleInputChange(e.target.value)}
                className="bg-white/10 border-[#0088cc]/40 text-white placeholder:text-white/40 focus:border-[#0088cc] focus:ring-[#0088cc]/30 focus:ring-offset-0"
              />
              <p className="text-xs text-white/70 mt-1">
                Enter the Telegram username (e.g., @telegramuser)
              </p>
            </div>
          ) : (
            <PhoneInput 
              value={phoneOrUsername} 
              onChange={handleInputChange}
            />
          )}
          
          <MessageInput 
            value={message} 
            onChange={handleMessageChange} 
          />
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
              <TabsTrigger 
                value="link" 
                className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Link
              </TabsTrigger>
              <TabsTrigger 
                value="qr" 
                className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="space-y-4 pt-4">
              <div className="flex mt-2">
                <Input
                  readOnly
                  value={telegramLink}
                  placeholder="Generated Telegram link will appear here"
                  className="flex-grow mr-2 bg-white/10 border-[#0088cc]/40 text-white placeholder:text-white/40 focus:border-[#0088cc] focus:ring-[#0088cc]/30"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopy}
                  disabled={!isLinkValid}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                className="w-full bg-[#0088cc] hover:bg-[#0099dd] text-white font-medium shadow-[0_4px_12px_rgba(0,136,204,0.4)] py-6" 
                onClick={handleOpenChat}
                disabled={!isLinkValid}
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
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
