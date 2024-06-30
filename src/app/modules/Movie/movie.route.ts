import { Router } from "express"
import movieController from "./movie.controller"
import { movieValidations } from "./movie.validation"
import { validateRequest } from "../../middleware/validateRequest"

const router = Router()

router.post(
    "/",
    validateRequest(movieValidations.createMovieValidationSchema),
    movieController.createMovie,
)
router.delete("/:movieId", movieController.deleteMovie)

export const movieRoutes = router
