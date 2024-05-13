import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { addOneItemSchema } from "../../schemas";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

type Body = z.infer<typeof addOneItemSchema>;

const add = (router: Router) => {
  router.post(
    "/add-one",
    auth,
    inputValidation(addOneItemSchema),
    async (req: Request, res: Response) => {
      const { name, price: rawPrice, category } = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const price = Number(rawPrice);
      const newItem = await prisma.item.create({
        data: { name, price, category, restaurantId },
      });
      res.send(newItem);
    }
  );
};

export default add;
