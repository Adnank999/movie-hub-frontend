import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Providers } from "@/redux/provider";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import CustomToaster from "./components/CustomToaster";
import ToastNotification from "./components/ToastNotification";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Gen Movie App",
  description: "Entertainment Movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)]`}
        suppressHydrationWarning={true}
      >
        <Providers>
    
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
           
          >
            <Toaster position="top-right" reverseOrder={false} />
            <CustomToaster />
            <ToastNotification/>
            <Navbar />
            {children}
          </ThemeProvider>
       
        </Providers>
      </body>
    </html>
  );
}
