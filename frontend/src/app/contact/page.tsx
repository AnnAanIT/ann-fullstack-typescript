'use client';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '@/services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'danger' | '';
    message: string;
  }>({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/contact', formData);
      setStatus({
        type: 'success',
        message: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'danger',
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center mb-4">Liên hệ với chúng tôi</h1>
            
            {status.message && (
              <Alert variant={status.type} className="mb-4">
                {status.message}
              </Alert>
            )}

            <div className="mb-4">
              <h5>Thông tin liên hệ:</h5>
              <p><i className="fas fa-map-marker-alt"></i> Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
              <p><i className="fas fa-phone"></i> Điện thoại: (84) 123-456-789</p>
              <p><i className="fas fa-envelope"></i> Email: annaanit2310@gmail.com</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
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
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </Form>
          </div>
        </div>

        <div className="mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bản đồ</h5>
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.69843!3d10.777236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM4LjEiTiAxMDbCsDQxJzU0LjMiRQ!5e0!3m2!1svi!2s!4v1635764293593!5m2!1svi!2s"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}