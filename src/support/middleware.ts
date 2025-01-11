import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { failedResponse, successResponse } from "./http";
import { User } from "../models/users";
import { verifyJwtToken } from "./helpers";

dotenv.config()
 
export const IsAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return failedResponse(res, 401, 'Access denied. Authorization header missing.');
  }

  const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
  if (!token) {
    return failedResponse(res, 401, 'Access denied. No token provided.');
  }

  try {
    const decodedToken = verifyJwtToken(token);

    const user = await User.findById(decodedToken.userId);

    (req as any).user = {
      email: decodedToken.email,
      _id: decodedToken.userId
    };
    next();
  } catch (error: any) {
    return failedResponse(res, 401, 'Invalid access token.');
  }
};
