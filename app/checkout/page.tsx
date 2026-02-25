"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { useCart } from "@/contexts/CartContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useCustomer } from "@/contexts/CustomerContext";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import Link from "next/link";
import { ordersApi } from "@/lib/api";
import { Order, WebpayResponse } from "@/types";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const notification = useNotification();
  const { isAuthenticated } = useCustomer();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    notes: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = getTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear orden
      const order = await ordersApi.create({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        notes: formData.notes,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        paymentMethod: "webpay",
      }) as Order;

      // Iniciar pago con Webpay
      const webpayResponse = await ordersApi.initiateWebpay(order.id) as WebpayResponse;

      // Redirigir a Webpay
      if (webpayResponse.url) {
        window.location.href = webpayResponse.url;
      } else {
        throw new Error("No se recibió URL de Webpay");
      }
    } catch (error: any) {
      console.error("Error al procesar orden:", error);
      notification.showError(error.message || "Error al procesar la orden. Por favor, intenta nuevamente.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageTemplate>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-md mx-auto text-center">
              <Heading level={1} className="mb-4">Tu carrito está vacío</Heading>
              <Text className="text-gray-600 mb-8">
                Agrega productos antes de proceder al pago
              </Text>
              <Link href="/productos">
                <Button>Ver Productos</Button>
              </Link>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al carrito
            </Button>
          </Link>

          <Heading level={1} className="mb-6 sm:mb-8">Checkout</Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-primary-600" />
                  <Heading level={2} className="text-xl">Información de contacto</Heading>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="juan@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+56912345678"
                    />
                  </div>

                  <div>
                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección de entrega
                    </label>
                    <textarea
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Calle Falsa 123, Comuna, Ciudad"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Instrucciones especiales para la entrega..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        "Procesando..."
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Proceder a Webpay
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <Heading level={2} className="mb-4 text-lg">Resumen de compra</Heading>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <Text className="text-gray-600">
                        {item.product.name} x{item.quantity}
                      </Text>
                      <Text className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </Text>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <Text className="text-gray-600">Subtotal</Text>
                    <Text className="font-semibold">{formatPrice(total)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="font-bold text-lg">Total</Text>
                    <Text className="font-bold text-lg text-primary-600">{formatPrice(total)}</Text>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <Text className="text-sm text-gray-700">
                      Tu información está protegida. El pago se procesará de forma segura a través de Webpay Transbank.
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
