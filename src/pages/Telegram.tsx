
import React from 'react';
import TelegramLinkGenerator from '@/components/TelegramLinkGenerator';
import TelegramBackground3D from '@/components/TelegramBackground3D';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Telegram = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TelegramBackground3D />
      
      <header className="text-center py-8 px-4 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-1">Telegram Direct Chat</h1>
        <p className="text-gray-200">
          Chat without saving the contact first
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <Button variant="outline" asChild className="text-white border-white hover:bg-white/10">
            <Link to="/">WhatsApp</Link>
          </Button>
          <Button variant="default" asChild className="bg-[#0088cc] hover:bg-[#0099dd]">
            <Link to="/telegram">Telegram</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container max-w-lg px-4 py-6 relative z-10">
        <TelegramLinkGenerator />

        <div className="mt-12 text-center text-sm text-white/80">
          <h2 className="text-lg font-medium text-white mb-2">How it works</h2>
          <ol className="list-decimal text-left max-w-md mx-auto space-y-2">
            <li>Enter a Telegram username (e.g., @username) or phone number with country code</li>
            <li>Add an optional message</li>
            <li>Click "Open Chat" to start talking, or copy the link to share</li>
            <li>You can also generate a QR code to scan with your phone</li>
          </ol>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-white/70 relative z-10">
        <p>
          This tool helps you start Telegram conversations without saving contacts.
          <br />
          Not affiliated with Telegram.
        </p>
      </footer>
    </div>
  );
};

export default Telegram;
