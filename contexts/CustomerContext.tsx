"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  region?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  isActive?: boolean;
}

interface CustomerContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (token: string, customer: Customer) => void;
  logout: () => void;
  updateCustomer: (customer: Customer) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Cargar cliente desde localStorage
    const savedCustomer = localStorage.getItem("customer");
    const savedToken = localStorage.getItem("customer_token");
    
    if (savedCustomer && savedToken) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (error) {
        console.error("Error loading customer from localStorage:", error);
        localStorage.removeItem("customer");
        localStorage.removeItem("customer_token");
      }
    }
  }, []);

  const login = (token: string, customerData: Customer) => {
    localStorage.setItem("customer_token", token);
    localStorage.setItem("customer", JSON.stringify(customerData));
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    setCustomer(null);
  };

  const updateCustomer = (customerData: Customer) => {
    localStorage.setItem("customer", JSON.stringify(customerData));
    setCustomer(customerData);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        login,
        logout,
        updateCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
