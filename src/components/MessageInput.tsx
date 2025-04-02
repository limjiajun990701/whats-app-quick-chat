
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
      <Label htmlFor="message">Pre-filled Message (optional)</Label>
      <Textarea
        id="message"
        placeholder="Hello, I'd like to chat with you about..."
        value={value}
        onChange={handleChange}
        className="min-h-[80px]"
      />
    </div>
  );
};

export default MessageInput;
