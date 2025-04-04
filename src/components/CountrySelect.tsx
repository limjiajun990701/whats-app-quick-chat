
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define interface for Country data
export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

// Popular countries data
export const countries: Country[] = [
  { name: 'Malaysia', code: 'MY', dialCode: '60', flag: '🇲🇾' },
  { name: 'Singapore', code: 'SG', dialCode: '65', flag: '🇸🇬' },
  { name: 'Indonesia', code: 'ID', dialCode: '62', flag: '🇮🇩' },
  { name: 'Thailand', code: 'TH', dialCode: '66', flag: '🇹🇭' },
  { name: 'Philippines', code: 'PH', dialCode: '63', flag: '🇵🇭' },
  { name: 'Vietnam', code: 'VN', dialCode: '84', flag: '🇻🇳' },
  { name: 'United States', code: 'US', dialCode: '1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '44', flag: '🇬🇧' },
  { name: 'China', code: 'CN', dialCode: '86', flag: '🇨🇳' },
  { name: 'India', code: 'IN', dialCode: '91', flag: '🇮🇳' },
  { name: 'Australia', code: 'AU', dialCode: '61', flag: '🇦🇺' },
  { name: 'Japan', code: 'JP', dialCode: '81', flag: '🇯🇵' },
];

interface CountrySelectProps {
  selectedDialCode: string;
  onSelect: (dialCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ selectedDialCode, onSelect }) => {
  // Find the country that matches the selected dial code
  const selectedCountry = countries.find(country => country.dialCode === selectedDialCode) || countries[0];

  return (
    <Select 
      value={selectedDialCode} 
      onValueChange={(value) => onSelect(value)}
    >
      <SelectTrigger className="w-[90px] h-10 bg-[#0088cc]/30 border-[#0088cc]/50 text-white focus:ring-[#0088cc]/60 focus:ring-offset-0">
        <SelectValue>
          <span className="flex items-center">
            <span className="mr-1">{selectedCountry.flag}</span>
            <span>+{selectedDialCode}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#051c34] border-[#0088cc]/50 text-white">
        {countries.map((country) => (
          <SelectItem 
            key={country.code} 
            value={country.dialCode} 
            className="focus:bg-[#0088cc]/20 focus:text-white hover:bg-[#0088cc]/20 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>+{country.dialCode}</span>
              <span className="text-xs text-white/60 ml-1">({country.name})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
