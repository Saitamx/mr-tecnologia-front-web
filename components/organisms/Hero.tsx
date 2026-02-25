"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Zap,
  Smartphone,
  Palette,
  Gift
} from "lucide-react";

// Importar ThreeBackground solo en el cliente
const ThreeBackground = dynamic(() => import("./ThreeBackground").then(mod => ({ default: mod.ThreeBackground })), {
  ssr: false,
  loading: () => null,
});

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {mounted && <ThreeBackground />}
      
      {/* Gradientes decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge animado */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 shadow-lg mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-600 animate-spin-slow" />
            <Text className="text-sm font-semibold text-primary-700">
              Accesorios Tecnológicos Premium
            </Text>
          </div>

          {/* Título principal */}
          <Heading 
            level={1} 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight"
          >
            <span className="block mb-2">Accesorios que</span>
            <span className="block bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 bg-clip-text text-transparent animate-gradient">
              Transforman tu Dispositivo
            </span>
          </Heading>

          {/* Descripción */}
          <Text className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra colección exclusiva de carcasas personalizadas, 
            accesorios premium y productos tecnológicos de las mejores marcas. 
            <span className="block mt-2 font-semibold text-primary-700">
              Calidad, estilo y personalización en un solo lugar.
            </span>
          </Text>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16">
            <Link href="/productos">
              <Button 
                size="lg" 
                className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explorar Productos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/categorias">
              <Button 
                variant="outline" 
                size="lg"
                className="group border-2 border-primary-300 hover:border-primary-500 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Ver Categorías
              </Button>
            </Link>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Text className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Personalización</Text>
              <Text className="text-xs text-gray-600">Carcasas únicas</Text>
            </div>

            <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Text className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Diseño</Text>
              <Text className="text-xs text-gray-600">Estilo premium</Text>
            </div>

            <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Text className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Rápido</Text>
              <Text className="text-xs text-gray-600">Entrega express</Text>
            </div>

            <div className="group p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Text className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Calidad</Text>
              <Text className="text-xs text-gray-600">Garantizada</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Onda decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 md:h-32"
        >
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="white"
            className="animate-wave"
          />
        </svg>
      </div>
    </section>
  );
};
