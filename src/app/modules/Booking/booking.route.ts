import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { BookingValidations } from "./booking.validation"
import { BookingControllers } from "./booking.controller"

const router = Router()

router.post(
    "/",
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking,
)

export const BookingRouter = router
