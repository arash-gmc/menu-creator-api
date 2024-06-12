import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

const EditRestaurantSchema = z.object({
  title: z.string().min(3).max(255),
  username: z.string().min(3).max(64),
  logoPublicId: z.string().min(1).max(255),
  instagramId: z.string().max(255).optional(),
  phoneNumber: z.string().optional(),
  type: z.string().optional(),
});

type Body = z.infer<typeof EditRestaurantSchema>;

const edit = (router: Router) => {
  router.put(
    "/edit",
    auth,
    inputValidation(EditRestaurantSchema),
    async (req: Request, res: Response) => {
      const input: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      await prisma.restaurant.update({
        where: { id: restaurantId },
        data: input,
      });
      res.send({});
    }
  );
};

export default edit;
