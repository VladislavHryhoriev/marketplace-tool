import Container from "@/components/shared/container";
import { Tabs } from "@/components/shared/tabs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer
            hideProgressBar
            theme="dark"
            position="bottom-right"
            closeOnClick
            pauseOnFocusLoss={false}
          />
        </Container>
      </body>
    </html>
  );
}
