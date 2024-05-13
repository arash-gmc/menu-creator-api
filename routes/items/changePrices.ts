import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { changePricesSchema } from "../../schemas";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

type Body = z.infer<typeof changePricesSchema>;

const changePrices = (router: Router) => {
  router.put(
    "/change-prices",
    auth,
    inputValidation(changePricesSchema),
    async (req: Request, res: Response) => {
      const { percent }: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const changeRatio = 1 + percent / 100;
      try {
        await prisma.$queryRaw`UPDATE Item SET price=FLOOR(price*${changeRatio}) WHERE restaurantId=${restaurantId}`;
        res.send({});
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export default changePrices;
