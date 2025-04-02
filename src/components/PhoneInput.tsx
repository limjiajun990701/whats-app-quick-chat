import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CountrySelect, { countries } from './CountrySelect';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  // Extract dial code and number from the current value
  const extractDialCodeAndNumber = (phoneValue: string) => {
    // If value starts with +, try to extract dial code
    if (phoneValue.startsWith('+')) {
      // Find a matching country
      for (const country of countries) {
        if (phoneValue.startsWith(`+${country.dialCode}`)) {
          return {
            dialCode: country.dialCode,
            number: phoneValue.substring(country.dialCode.length + 1) // +1 for the '+'
          };
        }
      }
    }
    
    // Default to Malaysia if no match found
    return {
      dialCode: '60',
      number: phoneValue.startsWith('+') ? phoneValue.substring(1) : phoneValue
    };
  };

  const { dialCode, number } = extractDialCodeAndNumber(value);
  const [selectedDialCode, setSelectedDialCode] = useState(dialCode);
  
  const handleCountrySelect = (newDialCode: string) => {
    setSelectedDialCode(newDialCode);
    // Update the full phone number with the new dial code
    onChange(`+${newDialCode}${number}`);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    // Only keep digits, spaces, and dashes
    const cleanedNumber = newNumber.replace(/[^\d\s-]/g, '');
    // Update the full phone number
    onChange(`+${selectedDialCode}${cleanedNumber}`);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number (with country code)</Label>
      <div className="flex">
        <div className="mr-2">
          <CountrySelect 
            selectedDialCode={selectedDialCode}
            onSelect={handleCountrySelect}
          />
        </div>
        <div className="relative flex-1">
          <Input
            id="phone"
            type="tel"
            placeholder="123456789"
            value={number}
            onChange={handleNumberChange}
            className="pl-3"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter phone number without leading zeros (e.g., for Malaysia +60, enter 123456789)
      </p>
    </div>
  );
};

export default PhoneInput;
