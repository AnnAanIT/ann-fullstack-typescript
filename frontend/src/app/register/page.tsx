"use client";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Kiểm tra mật khẩu khớp
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      // Gọi API đăng ký
      const response = await api.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Log cấu trúc response chi tiết
      console.log(
        "Register response structure:",
        JSON.stringify(response.data, null, 2)
      );

      if (response.data) {
        // Kiểm tra các tên trường token khác nhau
        const tokenValue =
          response.data.token ||
          response.data.access_token ||
          (response.data.auth && response.data.auth.token);

        if (tokenValue) {
          // Lưu token với tên đúng
          localStorage.setItem("token", tokenValue);

          // Lưu thông tin user nếu có
          const userData = response.data.user || response.data;
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
          }

          console.log("Token found and saved:", tokenValue);
          toast.success("Đăng ký thành công!");

          // Chuyển hướng về trang chủ thay vì dashboard
          router.push("/");
        } else {
          console.log("No token found in response data:", response.data);
          toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
          router.push("/login");
        }
      } else {
        console.log("Empty response data");
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
      toast.error("Đăng ký không thành công");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </Button>

              <div className="text-center">
                Đã có tài khoản? <Link href="/login">Đăng nhập ngay</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
