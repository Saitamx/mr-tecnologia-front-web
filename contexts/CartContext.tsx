"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useNotification } from "./NotificationContext";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, showNotification?: boolean) => void;
  removeItem: (productId: string, showNotification?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, showNotification?: boolean) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const notification = useNotification();

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1, showNotification: boolean = true) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, actualizar cantidad
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          if (showNotification) {
            notification.showWarning(`⚠️ Solo hay ${product.stock} unidades disponibles de ${product.name}`);
          }
          return prevItems;
        }
        
        if (showNotification) {
          notification.showSuccess(
            `✅ ¡${product.name} agregado al carrito! (Total: ${newQuantity} ${newQuantity === 1 ? 'unidad' : 'unidades'})`,
            3500
          );
        }
        
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Si el producto no está en el carrito, agregarlo
        if (quantity > product.stock) {
          if (showNotification) {
            notification.showWarning(`⚠️ Solo hay ${product.stock} unidades disponibles de ${product.name}`);
          }
          return prevItems;
        }
        
        if (showNotification) {
          const message = quantity === 1 
            ? `✅ ¡${product.name} agregado al carrito! 🛒`
            : `✅ ¡${quantity} unidades de ${product.name} agregadas al carrito! 🛒`;
          notification.showSuccess(message, 3500);
        }
        
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId: string, showNotification: boolean = true) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId);
      if (item && showNotification) {
        notification.showSuccess(`${item.product.name} eliminado del carrito`, 2500);
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number, showNotification: boolean = false) => {
    if (quantity <= 0) {
      removeItem(productId, showNotification);
      return;
    }

    setItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId);
      if (item && quantity > item.product.stock) {
        if (showNotification) {
          notification.showWarning(`Solo hay ${item.product.stock} unidades disponibles de ${item.product.name}`);
        }
        return prevItems;
      }

      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
