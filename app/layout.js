import { Roboto } from "next/font/google";
import "./globals.css";
import Navigationbar from "@/components/Navigationbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import ReduxProvider from "./redux/reduxProvider";
import NextAuthProvider from "@/components/nextauth/sessionProvider";
import { ToastProvider } from '@/components/toastMessage/toastContext';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: "To do App",
  description: "Add and track to do item.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <Providers>
          <NextAuthProvider>
            <ReduxProvider>
              <div className="flex flex-col min-h-screen">
                <Navigationbar />
                <ToastProvider>
                  <main className="flex-grow">
                    {children}
                  </main>
                </ToastProvider>
                <Footer />
              </div>
            </ReduxProvider>
          </NextAuthProvider>
        </Providers>
      </body>
    </html >
  );
}
