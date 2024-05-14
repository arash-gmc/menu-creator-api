import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

const changePricesSchema = z.object({
  percent: z.number().min(-50).max(100),
  category: z.string().optional(),
});

type Body = z.infer<typeof changePricesSchema>;

const changePrices = (router: Router) => {
  router.put(
    "/change-prices",
    auth,
    inputValidation(changePricesSchema),
    async (req: Request, res: Response) => {
      const { percent, category }: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const changeRatio = 1 + percent / 100;
      try {
        if (category)
          await prisma.$executeRaw`UPDATE Item SET price=FLOOR(price*${changeRatio}) WHERE restaurantId=${restaurantId} AND category = ${category}`;
        else
          await prisma.$executeRaw`UPDATE Item SET price=FLOOR(price*${changeRatio}) WHERE restaurantId=${restaurantId}`;
        res.send({});
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export default changePrices;
