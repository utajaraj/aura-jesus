import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Abyssinica_SIL, Roboto } from 'next/font/google'
const sansation = localFont({
  src: "./fonts/sansation.woff",
  variable: "--sansation",
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
})
const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  variable: '--abyssinica',
  weight:["400"]
})
const roboto = Roboto({
  subsets: ['latin'],
  weight:["100","300","500","900"],
  variable: '--roboto',
})
export const metadata: Metadata = {
  title: "Aura Dashboarb",
  description: "Somehow it's just not financial reports",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansation.variable} ${roboto.variable} ${inter.variable} ${abyssinica.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
