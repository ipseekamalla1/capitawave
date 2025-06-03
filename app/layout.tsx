import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });



export const metadata: Metadata = {
  title: "CapitaWave Bank",
  description: "A banking solution for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
       
      </head>
       <body className={ptSerif.className}>{children}
       <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

       </body>
    </html>
  );
}
