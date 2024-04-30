import express, { Request, Response } from "express";
import prisma from "../prisma/client";
import validate from "../middlewares/validateInputs";
import { authSchema, restaurantRegisterationSchema as regSchema } from "../schemas";
import { z } from "zod";
import auth from "../middlewares/auth";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type RegisterBody = z.infer<typeof regSchema>
type AuthBody = z.infer<typeof authSchema>

const router = express.Router();

router.get("/get-all",auth, async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany();
  res.send(restaurants);
});

router.post('/login',async(req:Request,res:Response)=>{
  const {nameOrEmail,password}:AuthBody = req.body
  const restaurant = await prisma.restaurant.findUnique({where:{name:nameOrEmail}})
  if(!restaurant) await prisma.restaurant.findUnique({where:{email:nameOrEmail}})
  if(!restaurant) return res.status(400).send('email or password is not correct')
  const passwordValidation = await bcrypt.compare(password,restaurant.password)
  if(!passwordValidation) return res.status(400).send('email or password is not correct')
  const tokenObj = {id:restaurant.id,name:restaurant.name}
  const token = jwt.sign(tokenObj,process.env.jwtPrivateKey!)
  res.send(token)
})

router.post("/register",validate(regSchema), async (req: Request, res: Response) => {
  const { name, displayName,password:rawPassword,email,instagramId }:RegisterBody = req.body;
  const hashedPassword = await bcrypt.hash(rawPassword,10)
  await prisma.restaurant.create({ data: { name,displayName,password:hashedPassword,email,instagramId } });
  res.send("OK");
});


export default router;
