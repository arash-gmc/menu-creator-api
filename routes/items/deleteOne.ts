import { Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import prisma from "../../prisma/client";

const deleteOne = (router: Router) => {
  router.delete(
    "/delete/:itemId",
    auth,

    async (req: Request, res: Response) => {
      const { itemId } = req.params;
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const item = await prisma.item.findUnique({ where: { id: itemId } });
      if (restaurantId !== item?.restaurantId)
        return res.status(403).send("not allowed");
      const result = await prisma.item.delete({
        where: { id: itemId, restaurantId },
      });
      res.send(result);
    }
  );
};

export default deleteOne;
