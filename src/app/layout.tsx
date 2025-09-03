import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/userContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layouts/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Interview Prep - Ace Your Interviews with AI Power",
  description: "Personalized interview prep sessions designed to help you practice, improve, and excel with confidence. AI-powered questions and feedback.",
  keywords: "interview preparation, AI interview, job interview, practice questions, career development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}
