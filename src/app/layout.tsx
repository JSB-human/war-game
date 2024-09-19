import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import ClientProvider from "./component/clientProvider/ClientProvider";

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
  title: "전쟁",
  description: "아직 몰라요 뭐 할지",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>  
          <div className="w-full h-16 text-white font-bold text-3xl bg-[url('/png/image/header.jpg')] bg-bottom">

          </div>
        </header>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
