import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";

const add = (router: Router) => {
  router.post("/add-item", auth, async (req: Request, res: Response) => {
    const { name, price: rawPrice, category } = req.body;
    // @ts-ignore
    const restaurantId = req.payload.id as string;
    const price = Number(rawPrice);
    await prisma.item.create({ data: { name, price, category, restaurantId } });
    res.send("OK");
  });
};

export default add;
