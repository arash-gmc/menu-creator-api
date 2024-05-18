import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";
import { addOneItemSchema } from "./addOne";

export const addManyItemsSchema = z.array(addOneItemSchema);

type Body = z.infer<typeof addManyItemsSchema>;

const addMany = (router: Router) => {
  router.post(
    "/add-many",
    auth,
    inputValidation(addManyItemsSchema),
    async (req: Request, res: Response) => {
      const body: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const data = body.map((item) => ({
        ...item,
        price: Number(item.price),
        restaurantId,
      }));
      const newItems = await prisma.item.createMany({ data });
      res.send(newItems);
    }
  );
};

export default addMany;
