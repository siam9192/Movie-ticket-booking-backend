import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { ReviewValidations } from "./review.validation"
import { reviewController } from "./review.controller"

const router = Router()

router.post(
    "/",
    validateRequest(ReviewValidations.createReviewValidationSchema),
    reviewController.createReview,
)

export const ReviewRouter = router
