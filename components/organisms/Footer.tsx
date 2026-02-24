"use client";

import Link from "next/link";
import { Smartphone, MapPin, Mail } from "lucide-react";
import { Text } from "../atoms/Text";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">MR Tecnología</span>
            </div>
            <Text className="text-gray-400 text-sm">
              Accesorios tecnológicos de calidad. Carcasas personalizadas y productos de las mejores marcas.
            </Text>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos" className="text-gray-400 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-400 hover:text-white transition-colors">
                  Categorías
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Versluys SPP</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>saitam.developer.001@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Características</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🛒 Tienda Física</li>
              <li>✨ Carcasas Personalizadas</li>
              <li>📱 Accesorios Tecnológicos</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MR Tecnología. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
