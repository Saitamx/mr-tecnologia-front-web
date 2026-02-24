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
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
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
      
      {/* Categorías */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4 shadow-glow">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <Heading level={2} className="mb-3 sm:mb-4">Nuestras Categorías</Heading>
            <Text className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
              Explora nuestra amplia gama de accesorios tecnológicos
            </Text>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-100 mb-3 sm:mb-4">
                <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <Heading level={2} className="mb-2 sm:mb-3">Productos Destacados</Heading>
              <Text className="text-sm sm:text-base text-gray-600">
                Los más populares de nuestra tienda
              </Text>
            </div>
            <Link href="/productos">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-square mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
          )}

          <div className="text-center mt-8 sm:mt-10">
            <Link href="/productos">
              <Button variant="outline" size="lg" className="group sm:hidden">
                Ver Todos los Productos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Información de Tienda */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <Heading level={2} className="mb-4 sm:mb-6">Tienda Física</Heading>
            <Text className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Visítanos en Versluys SPP y descubre nuestra amplia selección de accesorios tecnológicos.
              Ofrecemos carcasas personalizadas, productos de las mejores marcas y atención personalizada.
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-3xl mb-2">🛒</div>
                <Heading level={3} className="text-lg mb-2">Tienda Física</Heading>
                <Text className="text-sm text-gray-600">Visítanos en persona</Text>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-3xl mb-2">✨</div>
                <Heading level={3} className="text-lg mb-2">Personalizadas</Heading>
                <Text className="text-sm text-gray-600">Carcasas a tu medida</Text>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-3xl mb-2">📍</div>
                <Heading level={3} className="text-lg mb-2">Versluys SPP</Heading>
                <Text className="text-sm text-gray-600">Encuéntranos aquí</Text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
