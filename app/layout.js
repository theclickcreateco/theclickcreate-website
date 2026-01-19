import { Fira_Code, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    default: "The Click & Create Co | Code. Build. Deploy.",
    template: "%s | The Click & Create Co"
  },
  description: "Creative solutions for businesses — websites, branding, and digital experiences.",
  metadataBase: new URL('https://theclickcreate.com'),
  openGraph: {
    title: "The Click & Create Co",
    description: "Creative solutions for businesses — websites, branding, and digital experiences.",
    url: "https://theclickcreate.com",
    siteName: "The Click & Create Co",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Click & Create Co",
    description: "Creative solutions for businesses — websites, branding, and digital experiences.",
    creator: "@theclickcreate", // Mock handle
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Breadcrumbs } from "@/components/breadcrumbs";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow min-h-screen pt-16">
            <Breadcrumbs />
            {children}
          </main>
          <WhatsAppWidget />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
