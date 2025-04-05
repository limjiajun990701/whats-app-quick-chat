
# Chat Link Generator

A modern web application for generating direct chat links for WhatsApp and Telegram without saving contacts first. This tool lets users create shareable links or QR codes to start conversations instantly.


## Features

- **WhatsApp Link Generation**
  - Create direct chat links using phone numbers
  - Add pre-filled messages to start conversations
  - Copy shareable links with one click
  - Generate scannable QR codes

- **Telegram Link Generation**
  - Create direct chat links using phone numbers or usernames
  - Add pre-filled messages
  - Copy shareable links with one click
  - Generate scannable QR codes

- **User-Friendly Interface**
  - Modern, responsive design
  - Intuitive controls for easy use
  - Real-time link generation as you type
  - Visual confirmation for copied links

## How It Works

### WhatsApp Direct Chat
1. Enter a phone number with country code
2. Add an optional message to start the conversation with
3. Click "Open Chat" to start talking, or copy the link to share
4. Alternatively, generate a QR code for easy mobile device scanning

### Telegram Direct Chat
1. Enter a Telegram username (e.g., @username) or phone number with country code
2. Add an optional message to start the conversation with
3. Click "Open Chat" to start talking, or copy the link to share
4. Alternatively, generate a QR code for easy mobile device scanning

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- React Router for navigation
- QRCode library for QR code generation
- Three.js with React Three Fiber for 3D backgrounds
- Framer Motion for animations

## Development

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd chat-link-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## Privacy

This application does not store any data. All link generation happens locally in your browser, and no phone numbers or messages are saved on any server.

## License

[MIT License](LICENSE)

## Disclaimer

This tool is not affiliated with, associated with, or endorsed by WhatsApp Inc. or Telegram Messenger Inc. WhatsApp and Telegram are trademarks of their respective owners.
