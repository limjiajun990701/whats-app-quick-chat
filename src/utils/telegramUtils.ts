/**
 * Format a phone number by removing non-digit characters except the plus sign
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Keep the + sign (if present) but remove all other non-digit characters
  return phoneNumber.replace(/[^\d+]/g, '');
};

/**
 * Generate a Telegram link based on the username or phone number
 */
export const generateTelegramLink = (input: string, message: string = ''): string => {
  const formattedInput = input.trim();
  
  // Telegram links can be username based or phone based
  const baseUrl = 'https://t.me/';
  
  // Handle username or phone
  const path = formattedInput.startsWith('@') 
    ? formattedInput.substring(1) // Remove @ from username
    : formattedInput;
  
  // If there's a message, encode it and add it to the URL
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  
  return `${baseUrl}${path}${encodedMessage}`;
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
