import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nhăc tôi",
  description: "Created by: @Lương Khoa"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(inter.className, "dark")}
        style={{
          colorScheme: "dark",
        }}
      >
        <body>
          <ThemeProvider>
          <NextTopLoader />
            <div
              className="
             flex
             min-h-screen
             w-full
             flex-col
             items-center
             dark:bg-black
             font-mono"
            >
              <Navbar />
              <Separator />
              <main className="flex flex-grow w-full justify-center items-center dark:bg-neutral-950">
                {children}
                <Toaster />
              </main>
              <footer className="py-2 text-xs">
                Mini project code by <a className="text-red-500 font-bold" href="https://luongkhoa.io.vn/" target="_blank">@Lương Khoa</a>
              </footer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}