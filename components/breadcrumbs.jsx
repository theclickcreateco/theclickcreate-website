"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-blue-500 flex items-center transition-colors">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          // Format title: remove special chars, capitalize words. Truncate if too long (optional)
          const title = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

          return (
            <li key={href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              {isLast ? (
                <span className="font-semibold text-foreground line-clamp-1 max-w-[200px]">{title}</span>
              ) : (
                <Link href={href} className="hover:text-blue-500 transition-colors">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
