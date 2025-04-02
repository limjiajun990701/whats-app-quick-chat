
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { formatPhoneNumber, generateWhatsAppLink, copyToClipboard } from '@/utils/whatsappUtils';
import PhoneInput from './PhoneInput';
import MessageInput from './MessageInput';
import QRCodeGenerator from './QRCodeGenerator';

const WhatsAppLinkGenerator: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [activeTab, setActiveTab] = useState('link');
  const { toast } = useToast();

  // Generate WhatsApp link whenever inputs change
  useEffect(() => {
    if (phoneNumber.trim()) {
      const formatted = formatPhoneNumber(phoneNumber);
      const link = generateWhatsAppLink(formatted, message);
      setWhatsappLink(link);
    } else {
      setWhatsappLink('');
    }
  }, [phoneNumber, message]);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const handleCopy = async () => {
    if (whatsappLink) {
      const success = await copyToClipboard(whatsappLink);
      if (success) {
        toast({
          title: "Copied to clipboard!",
          description: "The WhatsApp link has been copied",
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
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
    }
  };

  const isLinkValid = whatsappLink && phoneNumber.trim().length > 5;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <PhoneInput value={phoneNumber} onChange={handlePhoneChange} />
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
                  value={whatsappLink}
                  placeholder="Generated WhatsApp link will appear here"
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
              <QRCodeGenerator url={whatsappLink} isActive={activeTab === 'qr' && isLinkValid} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppLinkGenerator;
