import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
  name: string;
  iat: number;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("token is not provided");
  const payload = jwt.decode(token) as Payload;
  if (!payload) return res.status(401).send("token is not correct");
  // @ts-ignore
  req["payload"] = payload;
  next();
};

export default auth;
