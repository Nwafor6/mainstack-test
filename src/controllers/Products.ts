import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { productSchema, updateProductSchema } from '../schemas/Products';
import { failedResponse, successResponse } from '../support/http';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const { error, value } = productSchema.validate(req.body);
      if (error) return failedResponse(res, 400, `${error.details[0].message}`);

      const product = new Product(value);
      await product.save();
      return successResponse(res, 201, "Product added successfully", product)
    } catch (error:any) {
        return failedResponse(res, 500, error.message);
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const products = await Product.find(req.query);
      return successResponse(res, 200, "Success", products)
    } catch (error:any) {
        return failedResponse(res, 500, error.message);
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return failedResponse(res, 404, "Product not found");
      }
      return successResponse(res, 200, "Success", product)
    } catch (error:any) {
        return failedResponse(res, 500, error.message);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { error, value } = updateProductSchema.validate(req.body);
      if (error) return failedResponse(res, 400, `${error.details[0].message}`);

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true, runValidators: true }
      );
      if (!product) {
        return failedResponse(res, 404, "Product not found");
      }
      return successResponse(res, 200, "Success", product)
    } catch (error:any) {
        return failedResponse(res, 500, error.message);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return failedResponse(res, 404, "Product not found");
      }
      return failedResponse(res, 204);
    } catch (error:any) {
        return failedResponse(res, 500, error.message);
    }
  }
}
