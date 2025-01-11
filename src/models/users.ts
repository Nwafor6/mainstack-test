import { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces/users';


const UserSchema: Schema<IUser> = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export const User: Model<IUser> = model<IUser>('User', UserSchema);
