import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./ui/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dibimbing Notes",
  description: "Make for study case Dibimbing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Nav />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
