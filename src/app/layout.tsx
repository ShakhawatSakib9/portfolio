import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import PerformanceWidget from "@/components/PerformanceWidget";
import { ModeProvider } from "@/context/ModeContext";
import ThemeWrapper from "@/components/ThemeWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Md. Shakhawat Hossain — Full-Stack Developer",
  description:
    "Portfolio of Md. Shakhawat Hossain — Full-Stack Web Developer specializing in Laravel, PHP & MySQL. Building fast, scalable backends and clean interfaces.",
  keywords: ["Laravel", "PHP", "Full-Stack Developer", "Backend Engineer", "Shakhawat Hossain"],
  authors: [{ name: "Md. Shakhawat Hossain" }],
  openGraph: {
    title: "Md. Shakhawat Hossain — Full-Stack Developer",
    description: "Building fast, scalable backends and clean interfaces with Laravel & PHP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-noise">
        <ModeProvider>
          <ThemeWrapper>
            <CustomCursor />
            <CommandPalette />
            <PerformanceWidget />
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeWrapper>
        </ModeProvider>
      </body>
    </html>
  );
}
