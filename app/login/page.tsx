"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { customersApi } from "@/lib/api";
import { useNotification } from "@/contexts/NotificationContext";
import { useCustomer } from "@/contexts/CustomerContext";

export default function LoginPage() {
  const router = useRouter();
  const notification = useNotification();
  const { login } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones del frontend
    if (!formData.email.trim()) {
      notification.showError("Por favor, ingresa tu email");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      notification.showError("Por favor, ingresa un email válido");
      return;
    }

    if (!formData.password.trim()) {
      notification.showError("Por favor, ingresa tu contraseña");
      return;
    }

    setLoading(true);

    try {
      const { customer, token } = await customersApi.login({
        email: formData.email,
        password: formData.password,
      }) as { customer: any; token: string };

      // Guardar token y actualizar contexto
      login(token, customer);

      notification.showSuccess(`¡Bienvenido de nuevo, ${customer.fullName}!`);
      
      // Redirigir al inicio o a la página anterior
      setTimeout(() => {
        const returnUrl = new URLSearchParams(window.location.search).get("return");
        router.push(returnUrl || "/");
      }, 1000);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      
      // Mensajes de error más específicos
      let errorMessage = "Error al iniciar sesión. Por favor, intenta nuevamente.";
      
      if (error.status === 401) {
        errorMessage = "Email o contraseña incorrectos. Verifica tus credenciales e intenta nuevamente.";
      } else if (error.status === 400) {
        errorMessage = "Por favor, completa todos los campos correctamente.";
      } else if (error.status === 404) {
        errorMessage = "Usuario no encontrado. Verifica tu email o regístrate si no tienes cuenta.";
      } else if (error.message && error.message.includes("Credenciales")) {
        errorMessage = "Email o contraseña incorrectos. Verifica tus credenciales e intenta nuevamente.";
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
      
      notification.showError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <PageTemplate>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto">
            <Card className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-primary-600" />
                </div>
                <Heading level={1} className="mb-2">Iniciar sesión</Heading>
                <Text className="text-gray-600 text-sm">
                  Accede a tu cuenta para continuar
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="juan@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tu contraseña"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>

                <div className="text-center">
                  <Text className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                      Regístrate aquí
                    </Link>
                  </Text>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
