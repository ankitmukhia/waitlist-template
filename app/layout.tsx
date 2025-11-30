import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SoundProvider } from "@/contexts/useSoundContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Waitlist Template",
  description:
    "A ready-to-deploy template designed for developers to quickly set up a waitlist. Clone, integrate your APIs, and deploy in minutes.",
  metadataBase: new URL("https://waitlist-tmpl.vercel.app"),
  openGraph: {
    title: "Quick Waitlist Template",
    description:
      "A ready-to-deploy template designed for developers to quickly set up a waitlist. Clone, integrate your APIs, and deploy in minutes.",
    type: "website",
    url: "https://waitlist-tmpl.vercel.app",
    locale: "en_US",
    siteName: "Quick Waitlist",
    images: [
      {
        url: "https://waitlist-tmpl.vercel.app/og-waitlist.png",
        width: 1200,
        height: 630,
        alt: "Quick Waitlist Template",
      },
    ],
  },
  twitter: {
    title: "Quick Waitlist Template",
    description:
      "A ready-to-deploy template designed for developers to quickly set up a waitlist. Clone, integrate your APIs, and deploy in minutes.",
    card: "summary_large_image",
    images: [
      {
        url: "https://waitlist-tmpl.vercel.app/twitter-waitlist.png",
        width: 1200,
        height: 630,
        alt: "Quick Waitlist Template",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${instrumentSans.variable} ${instrumentSerif.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <div
              className="fixed inset-0 -z-10 
						bg-[url('https://res.cloudinary.com/dtxxjwdml/image/upload/f_auto,q_auto,w_1920/v1752248821/zgh21c1dp0wcbzgsuiyx.jpg')] 
						dark:bg-[url('https://res.cloudinary.com/dtxxjwdml/image/upload/f_auto,q_auto,w_1920/v1752250594/xms1h28owres0lmmiltw.jpg')]
						bg-cover bg-center bg-no-repeat"
            />

            <div className="relative">
              <ThemeToggle />

              {children}
            </div>

            <Toaster richColors position="top-center" />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
