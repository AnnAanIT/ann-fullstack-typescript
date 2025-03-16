import { AuthProvider } from '@/contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientInitializer from '@/components/ClientInitializer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          {/* ClientInitializer là component mới để kiểm tra auth */}
          <ClientInitializer />
          <MainNavbar />
          <div className="container">
            {children}
          </div>
          <ToastContainer position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}