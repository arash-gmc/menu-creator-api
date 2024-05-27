import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

export const restaurantViewSchema = z.object({
  restaurantId: z.string(),
  interance: z.string().nullable()
});

type Body = z.infer<typeof restaurantViewSchema>;

const addView = (router: Router) => {
  router.post(
    "/add-view",
    inputValidation(restaurantViewSchema),
    async (req: Request, res: Response) => {
      const { restaurantId,interance }: Body = req.body;
      const restaurant = await prisma.restaurant.findUnique({where:{id:restaurantId}})
      if(!restaurant) return res.status(404).send({message:'no restaurant founded with this id'})
      await prisma.restaurantView.create({data:{restaurantId,interance}})
      res.send({});
    }
  );
};

export default addView;
