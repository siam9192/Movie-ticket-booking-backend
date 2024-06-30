import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { TheaterValidations } from "./theaterValidation"
import { theaterController } from "./theater.controller"

const router = Router()

router.post(
    "/",
    validateRequest(TheaterValidations.createTheaterValidationSchema),
    theaterController.createTheater,
)
router.get("/:theaterId", theaterController.getSingelTheaterByTheaterId)
router.patch(
    "/:theaterId",
    validateRequest(TheaterValidations.updateTheaterValidationSchema),
    theaterController.updateTheater,
)
export const theaterRoutes = router
