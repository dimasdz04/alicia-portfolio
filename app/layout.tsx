import type { Metadata } from "next";
import { Inter } from "next/font/google";
// INI ADALAH BARIS PALING PENTING UNTUK MEMANGGIL TAILWIND CSS:
import "./globals.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alicia Maharani | Hardware & Software Engineer",
  description: "Portfolio of Alicia Maharani",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}