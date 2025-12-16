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
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Yaazid & Amirah Wedding Invitation",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "❤️ Yaazid & Amirah Wedding Invitation",
    description: "You are warmly invited to celebrate the wedding of Yaazid & Amirah",
    images: ["/thumbnail.png"],
  },

  // Add these for better SEO
  metadataBase: new URL("https://invitation-wedding-tawny.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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