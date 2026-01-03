import { Router ,Request,Response } from "express";
const router = Router();
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import {formatError} from "./../helper/ErrorFormate.js"
import Prisma from "../config/database.js";
import bcrypt from "bcrypt";

// REGISTER ROUTE
router.post("/register",async(req:Request,res:Response)=>{
    try{
        const {body} = req
        const payload = registerSchema.parse(body)
       let userExist =  await Prisma.user.findUnique({
            where:{email:payload.email}
        })

        if(userExist){
            return res.status(422).json({message:"User already exists with this email"})
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        payload.password = await bcrypt.hash(payload.password,salt)
        delete payload.confirm_password
        await Prisma.user.create({
            data:payload as any
        })



        return res.json({payload,message:"User registered successfully"})
    }catch(err){
        if(err instanceof ZodError){
            const formattedErrors = formatError(err)
            return res.status(422).json({message:"Validation failed",errors:formattedErrors})
        }
        return res.status(500).json({message:"something went wrong please try again",error:err})
    }
})















export default router;  