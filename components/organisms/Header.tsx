"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { NavLink } from "../molecules/NavLink";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-medium" 
          : "bg-white shadow-soft"
      }`}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 sm:px-6" suppressHydrationWarning>
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20" suppressHydrationWarning>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-bold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo-mr-tecnologia.jpg"
                alt="MR Tecnología"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="hidden sm:inline">MR Tecnología</span>
            <span className="sm:hidden">MR Tech</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1" suppressHydrationWarning>
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/productos">Productos</NavLink>
            <NavLink href="/categorias">Categorías</NavLink>
          </nav>
          
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          suppressHydrationWarning
        >
          <nav className="py-4 border-t border-gray-200" suppressHydrationWarning>
            <div className="flex flex-col gap-1" suppressHydrationWarning>
              <NavLink href="/" className="block py-2 px-3 rounded-lg">Inicio</NavLink>
              <NavLink href="/productos" className="block py-2 px-3 rounded-lg">Productos</NavLink>
              <NavLink href="/categorias" className="block py-2 px-3 rounded-lg">Categorías</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
