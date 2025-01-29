import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from "@/contexts/AuthContext";
import { headers } from 'next/headers'
import ContextProvider from '@/contexts/index'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Xapp',
  description: 'The everything app.',
  icons: {
    icon: '/favico.ico', 
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <ContextProvider cookies={cookies}>
              {children}
            </ContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}