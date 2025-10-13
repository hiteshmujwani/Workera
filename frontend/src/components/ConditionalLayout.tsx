"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where header should not be shown
  const noHeaderPages = ["/login", "/register"];
  const showHeader = !noHeaderPages.includes(pathname);

  return (
    <div>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
