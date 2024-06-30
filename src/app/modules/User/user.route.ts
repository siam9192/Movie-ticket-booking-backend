import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { UserValidations } from "./user.validation"
import { UserController } from "./user.controller"

const router = Router()

router.post(
    "/registration-request",
    validateRequest(UserValidations.createUserValidationSchema),
    UserController.handleUserRegistration,
)
router.post(
    "/registration-request/verify",
    validateRequest(UserValidations.userRegistrationVerifySchema),
    UserController.createUser,
)

export const UserRouter = router
