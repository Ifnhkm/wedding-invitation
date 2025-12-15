import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "❤️ Yaazid & Amirah Wedding Invitation",
  description: "You are warmly invited to celebrate the wedding of Yaazid & Amirah",

  openGraph: {
    title: "❤️ Yaazid & Amirah Wedding Invitation",
    description: "You are warmly invited to celebrate the wedding of Yaazid & Amirah",
    url: "https://invitation-wedding-tawny.vercel.app/",
    siteName: "Wedding Invitation",
    images: [
      {
        url: "https://invitation-wedding-tawny.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Yaazid & Amirah Wedding Invitation",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "❤️ Yaazid & Amirah Wedding Invitation",
    description: "You are warmly invited to celebrate the wedding of Yaazid & Amirah",
    images: ["https://invitation-wedding-tawny.vercel.app/thumbnail.png"],
  },
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
