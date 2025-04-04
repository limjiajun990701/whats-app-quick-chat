
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="message" className="text-white/90 text-sm font-medium flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Pre-filled Message (optional)
      </Label>
      <Textarea
        id="message"
        placeholder="Hello, I'd like to chat with you about..."
        value={value}
        onChange={handleChange}
        className="min-h-[100px] bg-white/10 border-[#0088cc]/40 text-white placeholder:text-white/40 focus:border-[#0088cc] focus:ring-[#0088cc]/30 focus:ring-offset-0 resize-none"
      />
    </div>
  );
};

export default MessageInput;
