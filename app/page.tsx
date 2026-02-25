"use client";

import { useEffect, useState } from "react";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Hero } from "@/components/organisms/Hero";
import { ProductCard } from "@/components/molecules/ProductCard";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { productsApi, categoriesApi } from "@/lib/api";
import { Product, Category } from "@/types";
import { 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  Store, 
  Wand2, 
  MapPin, 
  Shield, 
  Truck, 
  Star,
  TrendingUp,
  Zap,
  Package,
  Award,
  Heart,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import Link from "next/link";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getFeatured(),
          categoriesApi.getAll(),
        ]);
        setFeaturedProducts(productsData as Product[]);
        setCategories(categoriesData as Category[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageTemplate>
      <Hero />
      
      {/* Beneficios destacados */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <Card className="group p-4 sm:p-6 text-center border-2 border-transparent hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Store className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Heading level={3} className="text-sm sm:text-base font-semibold mb-1">Tienda Física</Heading>
              <Text className="text-xs sm:text-sm text-gray-600">Visítanos en persona</Text>
            </Card>
            
            <Card className="group p-4 sm:p-6 text-center border-2 border-transparent hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Wand2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Heading level={3} className="text-sm sm:text-base font-semibold mb-1">Personalizadas</Heading>
              <Text className="text-xs sm:text-sm text-gray-600">Carcasas a tu medida</Text>
            </Card>
            
            <Card className="group p-4 sm:p-6 text-center border-2 border-transparent hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Heading level={3} className="text-sm sm:text-base font-semibold mb-1">Envío Rápido</Heading>
              <Text className="text-xs sm:text-sm text-gray-600">A todo Chile</Text>
            </Card>
            
            <Card className="group p-4 sm:p-6 text-center border-2 border-transparent hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <Heading level={3} className="text-sm sm:text-base font-semibold mb-1">Garantía</Heading>
              <Text className="text-xs sm:text-sm text-gray-600">Productos de calidad</Text>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Categorías */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-3 sm:mb-4 shadow-lg">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-bold">Nuestras Categorías</Heading>
            <Text className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
              Explora nuestra amplia gama de accesorios tecnológicos de las mejores marcas
            </Text>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {categories.slice(0, 10).map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
          
          {categories.length > 10 && (
            <div className="text-center mt-6 sm:mt-8">
              <Link href="/categorias">
                <Button variant="outline" size="lg" className="group">
                  Ver Todas las Categorías
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 font-bold">
                    Productos Destacados
                  </Heading>
                  <Text className="text-sm sm:text-base text-gray-600">
                    Los más populares y mejor valorados de nuestra tienda
                  </Text>
                </div>
              </div>
            </div>
            <Link href="/productos" className="hidden sm:block">
              <Button variant="ghost" size="lg" className="group items-center gap-2">
                Ver todos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-square mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {featuredProducts.slice(0, 8).map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-6 sm:mt-8">
                <Link href="/productos">
                  <Button variant="outline" size="lg" className="group">
                    Ver Todos los Productos
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <Text className="text-gray-600">No hay productos destacados disponibles</Text>
            </div>
          )}
        </div>
      </section>

      {/* Información de Tienda */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 sm:mb-6 border border-white/20">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-white font-bold">
              Visítanos en Versluys SPP
            </Heading>
            <Text className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Descubre nuestra amplia selección de accesorios tecnológicos. 
              Ofrecemos carcasas personalizadas, productos de las mejores marcas y atención personalizada.
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Card className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <Heading level={3} className="text-lg mb-2 text-white">Tienda Física</Heading>
                <Text className="text-sm text-white/80">Visítanos en persona</Text>
              </Card>
              <Card className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <Heading level={3} className="text-lg mb-2 text-white">Personalizadas</Heading>
                <Text className="text-sm text-white/80">Carcasas a tu medida</Text>
              </Card>
              <Card className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Heading level={3} className="text-lg mb-2 text-white">Calidad</Heading>
                <Text className="text-sm text-white/80">Productos premium</Text>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* Call to Action */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 sm:p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)`
              }}></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 sm:mb-6 border border-white/30">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-white font-bold">
                ¿Listo para encontrar tu próximo accesorio?
              </Heading>
              <Text className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Explora nuestra tienda y descubre productos de calidad con los mejores precios
              </Text>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/productos">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Ver Productos
                  </Button>
                </Link>
                <Link href="/categorias">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Ver Categorías
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageTemplate>
  );
}
