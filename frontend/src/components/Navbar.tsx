'use client';
import Link from 'next/link';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function MainNavbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    router.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Trang chủ</Nav.Link>
            </Link>
            <Link href="/products" passHref legacyBehavior>
              <Nav.Link>Sản phẩm</Nav.Link>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link>Liên hệ</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">
                  Xin chào, {user?.username}
                </span>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>
                  <Button variant="outline-light">Đăng nhập</Button>
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}