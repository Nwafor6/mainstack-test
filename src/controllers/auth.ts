import { Request, Response, NextFunction } from "express"
import { failedResponse, successResponse } from '../support/http';
import bcrypt from "bcryptjs"
import { User } from "../models/users";
import { loginValidator, userValidator } from "../schemas/user";
import { generateJwtToken } from "../support/helpers";


export class Onboarding {
  static async signup(req: Request, res: Response) {
    try {
      const { error, value } = userValidator.validate(req.body);
      if (error) return failedResponse(res, 400, `${error.details[0].message}`);

      const emailExist = await User.findOne({ email: value.email }).select('email');
      if (emailExist) {
        return failedResponse(res, 400, 'Email already exists.');
      }

      const salt = await bcrypt.genSalt(10);
      value.password = await bcrypt.hash(value.password, salt);
      const newUser = await User.create(value);
      const accessToken = generateJwtToken({ email: value.email, userId: newUser.id });

      return successResponse(res, 201, 'Registration successful', accessToken);
    } catch (error: any) {
      return failedResponse(res, 500, error.message);
    }
  };

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginValidator.validate(req.body);
      if (error) return failedResponse(res, 400, `${error.details[0].message}`)
      const user = await User.findOne({ email: value.email })
      if (!user) {
        return failedResponse(res, 404, "User with this email does not exist.")
      }
      const validatePassword = await bcrypt.compare(value.password, user.password)
      if (!validatePassword) return failedResponse(res, 400, `Invalid credentals`)
      const accessToken = generateJwtToken({ email: value.email, userId: user.id })
      const payload = {
        email: user.email,
        _id: user._id,
      };
      return successResponse(res, 200, "Success", { payload, accessToken })
    } catch (error: any) {
      return failedResponse(res, 500, error.message)

    };
  };
}