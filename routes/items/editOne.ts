import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

const editOneItemSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
});

type Body = z.infer<typeof editOneItemSchema>;

const EditOne = (router: Router) => {
  router.put(
    "/edit-one",
    auth,
    inputValidation(editOneItemSchema),
    async (req: Request, res: Response) => {
      const input: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const item = await prisma.item.findUnique({ where: { id: input.id } });
      if (restaurantId !== item?.restaurantId)
        return res.status(403).send("not allowed");
      const { id, ...data } = input;
      const updatedItem = await prisma.item.update({
        where: { id: input.id },
        data,
      });
      res.send(updatedItem);
    }
  );
};

export default EditOne;
