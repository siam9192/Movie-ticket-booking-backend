import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { ShowValidations } from "./show.validation"
import { ShowControllers } from "./show.controller"

const router = Router()

router.post(
    "/",
    validateRequest(ShowValidations.createShowValidation),
    ShowControllers.createShow,
)

export const ShowRouter = router
