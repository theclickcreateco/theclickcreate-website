"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { Button } from "./button";
import { clsx } from "clsx";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const ThemeIcon = () => {
    if (!mounted) return <Sun className="w-5 h-5 opacity-50" />;
    if (theme === "dark") return <Moon className="w-5 h-5" />;
    if (theme === "light") return <Sun className="w-5 h-5" />;
    return <Laptop className="w-5 h-5" />;
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-heading text-2xl font-bold tracking-tighter text-gradient hover-gradient-x transition-all">
              &lt;C/&gt;
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors font-heading",
                    isActive(link.href) 
                      ? "text-gradient hover-gradient-x bg-[#2A9D8F]/10 font-bold" 
                      : "text-muted-foreground hover-text-gradient hover:bg-secondary/50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="ghost" className="p-2 ml-4">
                <ThemeIcon />
              </Button>
              <Link href="/contact">
                  <Button variant="primary" className="ml-4">Get a Quote</Button>
              </Link>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-blue-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "block px-3 py-2 rounded-md text-base font-medium font-heading",
                  isActive(link.href)
                    ? "text-gradient hover-gradient-x bg-[#2A9D8F]/10 font-bold"
                    : "text-foreground hover-text-gradient hover:bg-secondary"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Theme</span>
                <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="ghost" className="p-2">
                    <ThemeIcon />
                </Button>
             </div>
             <div className="px-3 py-2">
                 <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full">Get a Quote</Button>
                 </Link>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
}
