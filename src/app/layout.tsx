import Container from "@/components/shared/container";
import { Tabs } from "@/components/shared/tabs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UkrStore Templates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`bg-background ${inter.className}`}>
        <Container className="mt-4">
          <Tabs />
          <div>{children}</div>
        </Container>
      </body>
    </html>
  );
}
