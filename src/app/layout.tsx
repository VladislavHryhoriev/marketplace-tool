import Container from "@/components/shared/container";
import { Menu } from "@/components/shared/menu";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-zinc-700 text-white ${inter.className}`}>
        <Container className="mt-4">
          <Menu />
          <div>{children}</div>
        </Container>
      </body>
    </html>
  );
}
