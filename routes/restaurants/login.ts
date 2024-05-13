import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import { z } from "zod";
import { authSchema } from "../../schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type AuthBody = z.infer<typeof authSchema>;

const login = (router: Router) => {
  router.post("/login", async (req: Request, res: Response) => {
    const { nameOrEmail, password }: AuthBody = req.body;
    if (!nameOrEmail || !password)
      return res.status(400).send("not enough inputs");
    if (typeof nameOrEmail !== "string" || typeof password !== "string")
      return res.status(400).send("no valid input types");
    const restaurant = await prisma.restaurant.findUnique({
      where: { name: nameOrEmail },
    });
    if (!restaurant)
      await prisma.restaurant.findUnique({ where: { name: nameOrEmail } });
    if (!restaurant)
      return res.status(400).send("email or password is not correct");
    const passwordValidation = await bcrypt.compare(
      password,
      restaurant.password
    );
    if (!passwordValidation)
      return res.status(400).send("email or password is not correct");
    const tokenObj = { id: restaurant.id, name: restaurant.name };
    const token = jwt.sign(tokenObj, process.env.jwtPrivateKey!);
    res.send({ token, user: tokenObj });
  });
};

export default login;
