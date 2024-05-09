import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";

const getOneRestaurant = (router: Router) => {
  router.get("/get/:restaurantName", async (req: Request, res: Response) => {
    const { restaurantName } = req.params;
    if (!restaurantName) return res.status(400).send({});

    const restaurant = await prisma.restaurant.findUnique({
      where: { name: restaurantName },
    });
    if (!restaurant) return res.status(404).send({});
    const { password, ...noPasswordRestaurant } = restaurant;

    res.send(noPasswordRestaurant);
  });
};

export default getOneRestaurant;
