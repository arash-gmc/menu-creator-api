import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";

const getAllRestaurants = (router: Router) => {
  router.get("/get-all", async (req: Request, res: Response) => {
    const restaurants = await prisma.restaurant.findMany();
    res.send(restaurants);
  });
};

export default getAllRestaurants;
