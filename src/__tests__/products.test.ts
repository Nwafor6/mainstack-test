import request from 'supertest';
import app from '../app';
import bcrypt from 'bcryptjs';
import { generateJwtToken } from '../support/helpers';
import { User } from '../models/users';
import { Product } from '../models/Product';

describe('Products API Tests', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Create a test user and get auth token
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Test123!@#', salt);
    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword
    });
    userId = user._id.toString();
    authToken = generateJwtToken({ email: user.email, userId: user._id });
  });

  describe('POST /products', () => {
    it('should create a product successfully', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 100,
        category: 'Electronics'
      };

      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(productData.name);
      expect(response.body.data.price).toBe(productData.price);
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/products')
        .send({
          name: 'Test Product',
          description: 'Test Description',
          price: 99.99,
          stock: 100,
          category: 'Electronics'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /products', () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: 'Product 1',
          description: 'Description 1',
          price: 99.99,
          stock: 100,
          category: 'Electronics'
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          price: 149.99,
          stock: 50,
          category: 'Electronics'
        }
      ]);
    });

    it('should get all products', async () => {
      const response = await request(app)
        .get('/products')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/products')
        .query({ category: 'Electronics' })
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe('GET /products/:id', () => {
    let productId: string;

    beforeEach(async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 100,
        category: 'Electronics'
      });
      productId = product._id.toString();
    });

    it('should get a single product by ID', async () => {
      const response = await request(app)
        .get(`/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(productId);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/products/123456789012345678901234')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /products/:id', () => {
    let productId: string;

    beforeEach(async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 100,
        category: 'Electronics'
      });
      productId = product._id.toString();
    });

    it('should update a product successfully', async () => {
      const response = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Product',
          price: 149.99
        });

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('Updated Product');
      expect(response.body.data.price).toBe(149.99);
    });
  });

  describe('DELETE /products/:id', () => {
    let productId: string;

    beforeEach(async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 100,
        category: 'Electronics'
      });
      productId = product._id.toString();
    });

    it('should delete a product successfully', async () => {
      const response = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(204);

      // Verify product was deleted
      const deletedProduct = await Product.findById(productId);
      expect(deletedProduct).toBeNull();
    });
  });
});