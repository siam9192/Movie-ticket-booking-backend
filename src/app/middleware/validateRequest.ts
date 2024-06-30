import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { AnyZodObject } from "zod"

export const validateSchema = (zodSchema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await zodSchema.parseAsync(req.body)

            next()
        } catch (err) {
            next(err)
        }
    }
}

export const validateRequest = validateSchema
