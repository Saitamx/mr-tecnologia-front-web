const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `Error HTTP: ${response.status} ${response.statusText}` 
        }));
        const error = new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        (error as any).status = response.status;
        (error as any).error = errorData;
        throw error;
      }

      return response.json();
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de red al conectar con el servidor');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

export const productsApi = {
  getAll: () => apiClient.get('/products?isActive=true'),
  getFeatured: () => apiClient.get('/products/featured'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  getBySlug: (slug: string) => apiClient.get(`/products/slug/${slug}`),
  getByCategory: (categoryId: string) => apiClient.get(`/products?categoryId=${categoryId}&isActive=true`),
};

export const categoriesApi = {
  getAll: () => apiClient.get('/categories'),
  getById: (id: string) => apiClient.get(`/categories/${id}`),
  getBySlug: (slug: string) => apiClient.get(`/categories/slug/${slug}`),
  getAllWithProducts: () => apiClient.get('/categories/with-products'),
};
