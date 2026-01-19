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
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Monetag JS Script */}
        <Script 
          src="https://quge5.com/88/tag.min.js" 
          data-zone="203647" 
          async 
          data-cfasync="false"
          strategy="afterInteractive"
        />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6110592895163597"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Site Verification Placeholder */}
        <meta name="google-site-verification" content="YOUR_GSC_VERIFICATION_CODE" />
        
        {/* Google Tag Manager - Replace GTM-XXXXXXX with your ID */}
        <Script id="gtm-base" strategy="worker">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PWL69FHG');`}
        </Script>

        {/* Monetag Integration - Replace with your actual Monetag script */}
        {/* <Script src="https://alwingulla.com/88/p.js" strategy="afterInteractive" /> */}
        <meta name="monetag" content="7901f319c950ce5c22e8bc16f64c46ae"></meta>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} ${montserrat.variable} antialiased font-sans`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PWL69FHG"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
