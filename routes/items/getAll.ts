import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";

const getAll = (router: Router) => {
  router.get("/get/:restaurantName", async (req: Request, res: Response) => {
    const restaurantName = req.params.restaurantName;
    if (!restaurantName) return res.status(400).send({message:"Restaurant name is not provided"});
    const items = await prisma.item.findMany({
      where: { restaurant: { name: restaurantName } },
      orderBy: { category: "asc" },
    });
    res.send(items);
  });
};

export default getAll;
