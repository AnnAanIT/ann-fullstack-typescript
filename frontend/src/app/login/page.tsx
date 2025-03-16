'use client';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { authApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(email, password);
      
      // Lưu thông tin đăng nhập
      login(response.token, response.user);
      
      // Hiển thị thông báo thành công
      toast.success('Đăng nhập thành công!');
      
      // Chuyển hướng về trang chủ
      router.push('/');
      
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.'
      );
      toast.error('Đăng nhập không thành công!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Đăng nhập</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>

              <div className="text-center">
                Chưa có tài khoản?{' '}
                <Link href="/register">
                  Đăng ký ngay
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}