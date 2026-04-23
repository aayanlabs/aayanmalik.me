import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { InteractiveCursor } from "@/components/InteractiveCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Aayan Malik | AayanLabs — Building the Future",
  description: "Young builder focused on AI, Web Apps, and Creative Tech. Transforming ideas into high-impact products.",
  keywords: ["Aayan Malik", "AayanLabs", "AI Engineer", "Software Developer", "Creative Tech", "Startup Founder"],
  openGraph: {
    title: "Aayan Malik | AayanLabs",
    description: "Young builder focused on AI, Web Apps, and Creative Tech.",
    url: "https://aayanmalik.me",
    siteName: "Aayan Malik Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayan Malik | AayanLabs",
    description: "Young builder focused on AI, Web Apps, and Creative Tech.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-background text-foreground font-inter">
        <InteractiveCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
