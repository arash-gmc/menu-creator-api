import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import { restaurantRegisterationSchema as regSchema } from "../../schemas";
import validate from "../../middlewares/validateInputs";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type RegisterBody = z.infer<typeof regSchema>;

const register = (router: Router) => {
  router.post(
    "/register",
    validate(regSchema),
    async (req: Request, res: Response) => {
      const {
        username,
        title,
        password: rawPassword,
        email,
        instagramId,
      }: RegisterBody = req.body;
      const repeatedRecord = await prisma.restaurant.findUnique({
        where: { username },
      });
      if (repeatedRecord)
        return res.status(400).send({
          message:
            "There is another restaurant with this username. please select another username.",
        });
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      const newUser = await prisma.restaurant.create({
        data: {
          username,
          title,
          password: hashedPassword,
          email,
          instagramId,
        },
      });
      const tokenObj = { id: newUser.id, name: newUser.username };
      const token = jwt.sign(tokenObj, process.env.jwtPrivateKey!);
      res.send({ user: tokenObj, token });
    }
  );
};

export default register;
