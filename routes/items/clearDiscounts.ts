import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";

const removeAllDiscounts = (router: Router) => {
  router.put("/remove-discounts", auth, async (req: Request, res: Response) => {
    // @ts-ignore
    const restaurantId = req.payload.id as string;
    await prisma.item.updateMany({
      where: { restaurantId },
      data: { offPercent: null, offDueDate: null },
    });
    res.send({});
  });
};

export default removeAllDiscounts;
