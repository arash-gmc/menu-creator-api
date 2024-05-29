import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";





const changeTheme = (router: Router) => {
  router.get(
    "/change-theme/:theme",
    auth,
    async (req: Request, res: Response) => {
      const {theme}=req.params
      if(!theme) return res.status(400).send({message:'theme is not provided'})
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      await prisma.restaurant.update({where:{id:restaurantId},data:{theme}})
      res.send({})
    }
  );
};

export default changeTheme;
