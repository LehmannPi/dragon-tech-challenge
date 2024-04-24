import { CssBaseline } from '@mui/material';
import type { Metadata } from 'next';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Dragon App Challenge',
  description: 'Project for UEX mid-level developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />
      <body>{children}</body>
    </html>
  );
}
