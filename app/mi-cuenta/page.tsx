"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { User, Mail, Phone, MapPin, Package, LogOut, Edit, Calendar } from "lucide-react";
import { useCustomer } from "@/contexts/CustomerContext";
import { customersApi, ordersApi } from "@/lib/api";
import { Order } from "@/types";
import { useNotification } from "@/contexts/NotificationContext";
import Link from "next/link";

export default function MiCuentaPage() {
  const router = useRouter();
  const { customer, isAuthenticated, logout } = useCustomer();
  const notification = useNotification();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?return=/mi-cuenta");
      return;
    }

    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    if (!customer) return;

    try {
      setOrdersLoading(true);
      // Obtener órdenes del cliente autenticado
      const customerOrders = await ordersApi.getMyOrders() as Order[];
      setOrders(customerOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      notification.showError("Error al cargar tus órdenes");
    } finally {
      setOrdersLoading(false);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    notification.showInfo("Sesión cerrada exitosamente");
    router.push("/");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      paid: "bg-green-100 text-green-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendiente",
      processing: "Procesando",
      paid: "Pagado",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    };
    return labels[status] || status;
  };

  if (loading || !isAuthenticated || !customer) {
    return (
      <PageTemplate>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <Heading level={1} className="mb-2">Mi Cuenta</Heading>
                <Text className="text-gray-600">Gestiona tu información y revisa tus pedidos</Text>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="mt-4 sm:mt-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del Cliente */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <Heading level={2} className="text-lg">{customer.fullName}</Heading>
                      <Text className="text-sm text-gray-600">{customer.email}</Text>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <Text className="text-sm text-gray-600">Email</Text>
                        <Text className="font-medium">{customer.email}</Text>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <Text className="text-sm text-gray-600">Teléfono</Text>
                        <Text className="font-medium">{customer.phone}</Text>
                      </div>
                    </div>

                    {customer.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <Text className="text-sm text-gray-600">Dirección</Text>
                          <Text className="font-medium">{customer.address}</Text>
                          {(customer.city || customer.region) && (
                            <Text className="text-sm text-gray-600">
                              {customer.city}
                              {customer.city && customer.region && ", "}
                              {customer.region}
                            </Text>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Órdenes */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <Heading level={2} className="mb-6 text-lg">Mis Pedidos</Heading>

                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <Heading level={3} className="mb-2">No tienes pedidos aún</Heading>
                      <Text className="text-gray-600 mb-6">
                        Cuando realices tu primera compra, aparecerá aquí
                      </Text>
                      <Link href="/productos">
                        <Button>Ver Productos</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Heading level={3} className="text-base font-semibold">
                                  {order.orderNumber}
                                </Heading>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusLabel(order.status)}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <Text>{formatDate(order.createdAt)}</Text>
                                </div>
                                <div>
                                  <Text>
                                    <span className="font-medium">{order.items?.length || 0}</span>{" "}
                                    producto{order.items?.length !== 1 ? "s" : ""}
                                  </Text>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Text className="text-lg font-bold text-primary-600">
                                {formatPrice(order.total)}
                              </Text>
                              <Link href={`/ordenes/${order.id}`}>
                                <Button variant="ghost" size="sm">
                                  Ver Detalles
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
