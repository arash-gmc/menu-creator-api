import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import { restaurantRegisterationSchema as regSchema } from "../../schemas";
import validate from "../../middlewares/validateInputs";
import { z } from "zod";
import bcrypt from "bcrypt";

type RegisterBody = z.infer<typeof regSchema>;

const register = (router: Router) => {
  router.post(
    "/register",
    validate(regSchema),
    async (req: Request, res: Response) => {
      const {
        name,
        displayName,
        password: rawPassword,
        email,
        instagramId,
      }: RegisterBody = req.body;
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      await prisma.restaurant.create({
        data: {
          name,
          displayName,
          password: hashedPassword,
          email,
          instagramId,
        },
      });
      res.send("OK");
    }
  );
};

export default register;
