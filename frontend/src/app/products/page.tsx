'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import api from '@/services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h1 className="mb-4">Sản phẩm của chúng tôi</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-bold">
                    {product.price.toLocaleString('vi-VN')} đ
                  </span>
                  <Button variant="primary">Mua ngay</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}