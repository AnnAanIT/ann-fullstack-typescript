'use client';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ClientInitializer() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Kiểm tra token trong localStorage khi component mount
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData && !isAuthenticated) {
        try {
          const parsedUser = JSON.parse(userData);
          login(token, parsedUser);
          console.log('Auto login successful from ClientInitializer');
        } catch (err) {
          console.error('Error parsing user data:', err);
        }
      }
    };

    // Gọi ngay lần đầu khi component mount
    checkAuthentication();

    // Thiết lập interval để kiểm tra liên tục trong trường hợp timing issues
    const interval = setInterval(checkAuthentication, 500);

    // Chỉ kiểm tra trong 3 giây đầu tiên sau khi trang tải
    setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, login]);

  // Component này không render gì
  return null;
}