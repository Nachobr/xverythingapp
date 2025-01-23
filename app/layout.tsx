import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Your App Name',
  description: 'Your app description goes here.',
  icons: {
    icon: '/favico.ico', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}