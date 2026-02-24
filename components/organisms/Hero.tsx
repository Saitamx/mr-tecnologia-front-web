"use client";

import Link from "next/link";
import { Button } from "../atoms/Button";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Smartphone, Sparkles, MapPin } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10" suppressHydrationWarning>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24" suppressHydrationWarning>
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in" suppressHydrationWarning>
          <div className="flex justify-center mb-4 sm:mb-6" suppressHydrationWarning>
            <div className="relative" suppressHydrationWarning>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-float" suppressHydrationWarning></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-3xl border border-white/20 shadow-glow" suppressHydrationWarning>
                <Smartphone className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-scale-in" />
              </div>
            </div>
          </div>
          <Heading level={1} className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
            MR Tecnología
          </Heading>
          <Text className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Accesorios tecnológicos de calidad. Carcasas personalizadas, productos JBL, Samsung y más. 
            Encuéntranos en Versluys SPP.
          </Text>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6" suppressHydrationWarning>
            <Link href="/productos" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Ver Productos
              </Button>
            </Link>
            <Link href="/categorias" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <MapPin className="w-5 h-5" />
                Categorías
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 text-sm sm:text-base" suppressHydrationWarning>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="text-white/90">Tienda Física</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-white/90">Personalizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <span className="text-white/90">Versluys SPP</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white to-transparent" suppressHydrationWarning></div>
    </section>
  );
};
