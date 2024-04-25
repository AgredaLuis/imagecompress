import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Compressor App - WebP | by AntuanLabs", 
  description: " Image Compressor App - Compress your PNG , JPG and WebP images into a compressed WebP, or use the same API your website uses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
        {children}</body>
    </html>
  );
}
