import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "The Blog",
  description: "A simple blog viewer app built with Next.js and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[color:var(--background)] text-[color:var(--foreground)] min-h-screen" cz-shortcut-listen="true">
        <Header />
        <div className="pt-8">{children}</div>
      </body>
    </html>
  );
} 