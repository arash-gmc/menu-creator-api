import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";

const getAll = (router: Router) => {
  router.get("/get/:restaurantId", async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) return res.status(400).send("not provided");
    const items = await prisma.item.findMany({
      where: { restaurantId },
    });
    res.send(items);
  });
};

export default getAll;
