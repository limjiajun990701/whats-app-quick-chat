
import React from 'react';
import TelegramLinkGenerator from '@/components/TelegramLinkGenerator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink, MessageCircle, Info, CheckCircle } from 'lucide-react';

const Telegram = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TelegramBackground3D is now managed by App.tsx */}
      
      <header className="text-center py-8 px-4 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Telegram Direct Chat
        </h1>
        <p className="text-lg text-white/90 max-w-md mx-auto drop-shadow">
          Start conversations without saving contacts first
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <Button variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30">
            <Link to="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </Link>
          </Button>
          <Button variant="default" asChild className="bg-[#0088cc] hover:bg-[#0099dd] shadow-lg">
            <Link to="/telegram" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
              </svg>
              Telegram
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container max-w-xl px-4 py-8 relative z-10">
        <TelegramLinkGenerator />

        <div className="mt-12 bg-gradient-to-br from-[#051c34]/80 to-[#0a3464]/80 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
            <Info className="w-5 h-5 text-[#0088cc]" />
            How it works
          </h2>
          <ol className="list-none text-left space-y-4 text-white/90">
            {[
              "Enter a Telegram username (e.g., @username) or phone number with country code",
              "Add an optional message to start the conversation with",
              "Click "Open Chat" to start talking, or copy the link to share",
              "You can also generate a QR code for easy mobile device scanning"
            ].map((step, index) => (
              <li key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-white/80 text-sm">
            <CheckCircle className="w-4 h-4 text-[#0088cc]" />
            <span>No need to save contacts before chatting</span>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-white/70 relative z-10 mt-auto">
        <p className="backdrop-blur-sm py-2">
          This tool helps you start Telegram conversations without saving contacts.
          <br />
          Not affiliated with Telegram.
        </p>
      </footer>
    </div>
  );
};

export default Telegram;
