/**
 * Format a phone number by removing non-digit characters except the plus sign
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Keep the + sign (if present) but remove all other non-digit characters
  return phoneNumber.replace(/[^\d+]/g, '');
};

/**
 * Generate a WhatsApp link based on the phone number and optional message
 */
export const generateWhatsAppLink = (phoneNumber: string, message: string = ''): string => {
  const formattedNumber = formatPhoneNumber(phoneNumber);
  const baseUrl = 'https://wa.me/';
  
  // If the number starts with +, remove it for the URL
  const numberForUrl = formattedNumber.startsWith('+') 
    ? formattedNumber.substring(1) 
    : formattedNumber;
  
  // If there's a message, encode it and add it to the URL
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  
  return `${baseUrl}${numberForUrl}${encodedMessage}`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
