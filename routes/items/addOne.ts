import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

export const addOneItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().min(0),
  category: z.string().optional(),
});

type Body = z.infer<typeof addOneItemSchema>;

const add = (router: Router) => {
  router.post(
    "/add-one",
    auth,
    inputValidation(addOneItemSchema),
    async (req: Request, res: Response) => {
      const { name, price: rawPrice, category, description }: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const price = Number(rawPrice);
      const newItem = await prisma.item.create({
        data: { name, price, category, description, restaurantId },
      });
      res.send(newItem);
    }
  );
};

export default add;
