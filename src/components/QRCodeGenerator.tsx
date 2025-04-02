
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QRCodeGeneratorProps {
  url: string;
  isActive: boolean;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, isActive }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && url && qrRef.current) {
      // Call external QR library after import
      import('qrcode')
        .then((QRCode) => {
          if (qrRef.current) {
            qrRef.current.innerHTML = '';
            // Create canvas element
            const canvas = document.createElement('canvas');
            
            // Use toCanvas method with the correct callback signature
            QRCode.toCanvas(
              canvas,
              url,
              { width: 200, margin: 1 },
              (error) => {
                if (error) {
                  console.error('Error generating QR code:', error);
                  return;
                }
                
                // Append the canvas to the ref element
                if (qrRef.current) {
                  qrRef.current.appendChild(canvas);
                }
              }
            );
          }
        })
        .catch((err) => {
          console.error('Failed to load QR code library:', err);
        });
    }
  }, [url, isActive]);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'whatsapp-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  if (!isActive) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-center">Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div ref={qrRef} className="bg-white p-2 rounded-md mb-4 min-h-[200px] min-w-[200px] flex items-center justify-center">
          {!url && <p className="text-gray-400">Enter a valid phone number to generate QR</p>}
        </div>
        <Button 
          variant="outline" 
          onClick={downloadQRCode}
          disabled={!url}
          className="mt-2"
        >
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
