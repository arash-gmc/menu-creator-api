import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";

const setDiscountSchema = z.object({
  itemIds: z.array(z.string()),
  percent: z.number().min(5).max(80),
  dueDays: z.number().min(1).max(365),
});

type Body = z.infer<typeof setDiscountSchema>;

const setDiscount = (router: Router) => {
  router.put(
    "/set-discount",
    auth,
    inputValidation(setDiscountSchema),
    async (req: Request, res: Response) => {
      const { itemIds, percent, dueDays }: Body = req.body;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + dueDays);
      await prisma.item.updateMany({
        where: { restaurantId, id: { in: itemIds } },
        data: { offPercent: percent, offDueDate: dueDate },
      });
      res.send({});
    }
  );
};

export default setDiscount;
