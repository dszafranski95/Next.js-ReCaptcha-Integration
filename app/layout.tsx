import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleCaptcha from './GoogleCaptcha';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js ReCaptcha Integration',
  description: 'A secure and user-friendly implementation of Google ReCaptcha in a Next.js application. Learn how to protect your forms against spam and abuse with Google ReCaptcha.',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  keywords: 'Next.js, Google ReCaptcha, Web Security, Spam Protection',
  author: 'NEXTjs Captcha',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
        <GoogleCaptcha>
          {children}
        </GoogleCaptcha>
      </body>
    </html>
  );
}
