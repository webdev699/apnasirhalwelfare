import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apna Sirhal Welfare",
  description: "A platform dedicated to the welfare of the Apna Sirhal community, providing resources, support, and a space for connection and growth.",
verification: {
    google: 'x8cunJSnLAMTHdN6TOORF4Qtey2mR-FaCws3q8tqAMU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="x8cunJSnLAMTHdN6TOORF4Qtey2mR-FaCws3q8tqAMU"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>

    </html>
  );
}
