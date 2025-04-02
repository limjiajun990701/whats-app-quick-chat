
import React from 'react';
import WhatsAppLinkGenerator from '@/components/WhatsAppLinkGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <header className="text-center py-8 px-4">
        <h1 className="text-3xl font-bold text-whatsapp-dark mb-1">WhatsApp Direct Chat</h1>
        <p className="text-muted-foreground">
          Chat without saving the contact first
        </p>
      </header>

      <main className="flex-grow container max-w-lg px-4 py-6">
        <WhatsAppLinkGenerator />

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <h2 className="text-lg font-medium text-foreground mb-2">How it works</h2>
          <ol className="list-decimal text-left max-w-md mx-auto space-y-2">
            <li>Enter a phone number with country code (e.g., +60123456789)</li>
            <li>Add an optional message</li>
            <li>Click "Open Chat" to start talking, or copy the link to share</li>
            <li>You can also generate a QR code to scan with your phone</li>
          </ol>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>
          This tool helps you start WhatsApp conversations without saving contacts.
          <br />
          Not affiliated with WhatsApp or Meta.
        </p>
      </footer>
    </div>
  );
};

export default Index;
