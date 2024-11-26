import { Roboto } from "next/font/google";
import "./globals.css";
import Navigationbar from "@/components/Navigationbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

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
      <body
        className={`${roboto.className} antialiased`}
      >
        <Providers>

          <Navigationbar />

          <main>
            {children}
          </main>

          <Footer />

        </Providers>
      </body>
    </html >
  );
}
