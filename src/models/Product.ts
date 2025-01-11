import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/Products';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


productSchema.index({ name: 1, category: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);