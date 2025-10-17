import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Public_Sans} from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { CartProvider } from "./context/CartContext";
import { getUserWithId } from "./actions";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SearchProvider } from "./context/SearchContext";
import SearchBar from "@/components/SearchBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const publicSans =  Public_Sans({
    display: "swap",
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();

  let userData;
  if (data) {
    userData = await getUserWithId(data.identities[0].id);

  }
  
 

  return (
    <html lang="en" className={publicSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <CurrencyProvider>
        <SearchProvider>
        <CartProvider userData={data}>
          
          <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main className="min-h-screen flex flex-col items-center bg-white">
                  <div className="flex-1 w-full flex flex-col gap-20 items-center">

                    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20 border-gray-400 bg-gray-100">
                    <SearchBar/>
                    <div className="w-full max-w-7xl flex justify-between items-center p-3 px-2 md:px-5 text-sm ">
                        <div className="flex gap-2 md:gap-5  items-center font-semibold">
                          <SidebarTrigger />
                          <Link href={"/"}>My Shop</Link>
                          <div className="flex items-center gap-2">
                            <DeployButton />
                          </div>
                        </div>

                        {!hasEnvVars ? (
                          <EnvVarWarning />
                        ) : (
                          <HeaderAuth data={data} userData={userData} />
                        )}
                      </div>
                    </nav>

                    <div className="flex flex-col gap-20 w-full md:w-[75%] max-w-7xl p-4">
                      {children}
                    </div>
                  </div>
                </main>
              </ThemeProvider>
            </SidebarInset>
          </SidebarProvider>
          
        </CartProvider>
        </SearchProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
