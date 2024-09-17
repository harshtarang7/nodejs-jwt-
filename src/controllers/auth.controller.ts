import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { generateToken } from "../utils/jwt.utils";
import { BadRequestError, UnauthorizedError } from "../utils/erro.utils";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (userExist) {
      throw new BadRequestError("user already exist");
    }
    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user);
      res.json({
        _id: user._id,
        username: user.username,
        email: email,
        token,
      });
    } else {
      throw new UnauthorizedError("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};
