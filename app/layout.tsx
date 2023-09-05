import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/**@React_Toastify */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Structure Visualizer",
  description: "Developed by Pedro Foltram",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
