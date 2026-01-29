import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"], // Hangul subset might be needed but 'latin' is often default/required. Gaegu usually supports Hangul. 
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Go-Baek | Digital Notebook",
  description: "Share your confessions anonymously on a digital notebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gaegu.variable} antialiased font-gaegu bg-[#fdfbf7] text-[#333]`}
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // Subtle paper noise
        }}
      >
        {children}
      </body>
    </html>
  );
}
