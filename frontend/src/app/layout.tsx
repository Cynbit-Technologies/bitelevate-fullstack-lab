import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SprintPulse Client Project Management SaaS",
  description: "Full-Stack Client Project Management SaaS Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
