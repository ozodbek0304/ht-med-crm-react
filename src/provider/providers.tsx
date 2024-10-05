"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useThemeStore } from "../store";
import { cn } from "../lib/utils";
import { SonnToaster } from "../components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore();
  const location = usePathname();

  
  if (location === "/") {
    return (
      <body className={cn("dash-tail-app ", inter.className)}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <div className={cn("h-full  ")}>
            {children}
            {/* <ReactToaster /> */}
          </div>
          <Toaster />
          <SonnToaster />
        </ThemeProvider>
      </body>
    );
  }
  return (
    <body
      className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
      style={{
        "--radius": `${radius}rem`,
      } as React.CSSProperties
      }
    >
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <div className={cn("h-full  ")}>
          {children}
          {/* <ReactToaster /> */}
        </div>
        <Toaster />
        <SonnToaster />
      </ThemeProvider>
    </body>
  );
};

export default Providers;
