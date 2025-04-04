
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
import { Copy, ExternalLink, Send, QrCode, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-[#075e54]/90 to-[#128c7e]/90 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <PhoneInput 
            value={phoneNumber} 
            onChange={handlePhoneChange} 
          />
          
          <MessageInput 
            value={message} 
            onChange={handleMessageChange} 
          />
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
              <TabsTrigger 
                value="link" 
                className="data-[state=active]:bg-whatsapp-green data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Link
              </TabsTrigger>
              <TabsTrigger 
                value="qr" 
                className="data-[state=active]:bg-whatsapp-green data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="space-y-4 pt-4">
              <div className="flex mt-2">
                <Input
                  readOnly
                  value={whatsappLink}
                  placeholder="Generated WhatsApp link will appear here"
                  className="flex-grow mr-2 bg-white/10 border-whatsapp-green/40 text-white placeholder:text-white/40 focus:border-whatsapp-green focus:ring-whatsapp-green/30"
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
                className="w-full bg-whatsapp-green hover:bg-whatsapp-green/90 text-white font-medium shadow-[0_4px_12px_rgba(37,211,102,0.4)] py-6" 
                onClick={handleOpenChat}
                disabled={!isLinkValid}
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Open Chat
              </Button>
            </TabsContent>
            <TabsContent value="qr" className="pt-4">
              <QRCodeGenerator url={whatsappLink} isActive={activeTab === 'qr' && isLinkValid} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppLinkGenerator;
