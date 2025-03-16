// pages/index.tsx hoặc app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const [clientSideCheck, setClientSideCheck] = useState(false);

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData && !isAuthenticated) {
      // Nếu có token trong localStorage nhưng chưa đăng nhập trong context
      login(token, JSON.parse(userData));
    }
    
    setClientSideCheck(true);
  }, []);

  return (
    <div>
      {/* Nội dung trang chủ */}
    </div>
  );
}