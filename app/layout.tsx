import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { ShoppingCart } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const supabase = await createClient()
  // const { data } =  await  supabase.auth.getUserIdentities()
  // if (data) {
  //   console.log(data)

  // }

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>My Shop</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>

                 
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>

              <div className="flex flex-col gap-20 max-w-7xl p-4">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
