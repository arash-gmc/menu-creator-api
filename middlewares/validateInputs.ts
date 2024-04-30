import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";


const inputValidation =  (schema:Schema)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        console.log(req.body)
        const validationResult = schema.safeParse(req.body)
        if(!validationResult.success) return res.status(400).send(validationResult.error.errors)
        next()
    }
}

export default inputValidation