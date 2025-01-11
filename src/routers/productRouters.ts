import { Router } from "express";
import { ProductController } from "../controllers/Products";
import { IsAuthenticatedUser } from "../support/middleware";


export const productRouters = Router()

productRouters
.post("/products", IsAuthenticatedUser, ProductController.createProduct)
.get("/products", IsAuthenticatedUser, ProductController.getProducts)
.get("/products/:id", IsAuthenticatedUser, ProductController.getProduct)
.put("/products/:id", IsAuthenticatedUser, ProductController.updateProduct)
.delete("/products/:id", IsAuthenticatedUser, ProductController.deleteProduct)