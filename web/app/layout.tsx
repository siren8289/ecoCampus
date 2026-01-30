import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classroom Monitor",
  description: "Real-time classroom occupancy dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <MainLayout>
                {children}
            </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
