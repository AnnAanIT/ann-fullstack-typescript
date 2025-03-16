import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      if (response.data.token) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);
        // Lưu thông tin user
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      // Xử lý giống như login - lưu token nếu có
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Có thể thêm chuyển hướng về trang login nếu cần
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  }
};

// Interceptor để xử lý token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 Unauthorized - token hết hạn
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Thêm logic chuyển hướng đến trang đăng nhập nếu cần
    }
    return Promise.reject(error);
  }
);

export default api;