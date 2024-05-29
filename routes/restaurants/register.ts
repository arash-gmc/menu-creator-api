import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import validate from "../../middlewares/validateInputs";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerSchema = z.object({
  title: z.string().min(3).max(255),
  username: z.string().min(3).max(64),
  password: z.string().min(3).max(255),
  email: z.string().min(3).max(255).optional(),
  instagramId: z.string().min(3).max(255).optional(),
  theme: z.string().min(3).max(255).optional(),
});

type RegisterBody = z.infer<typeof registerSchema>;

const register = (router: Router) => {
  router.post(
    "/register",
    validate(registerSchema),
    async (req: Request, res: Response) => {
      const {
        username,
        title,
        password: rawPassword,
        email,
        instagramId,
        theme
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
          theme
        },
      });
      const tokenObj = { id: newUser.id, name: newUser.username };
      const token = jwt.sign(tokenObj, process.env.jwtPrivateKey!);
      res.send({ user: tokenObj, token });
    }
  );
};

export default register;
