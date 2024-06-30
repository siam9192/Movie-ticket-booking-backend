import { Router } from "express"
import { movieRoutes } from "../modules/Movie/movie.route"
import { theaterRoutes } from "../modules/Theater/theater.route"
import { ShowRouter } from "../modules/Show/show.route"
import { BookingRouter } from "../modules/Booking/booking.route"
import { UserRouter } from "../modules/User/user.route"
import { ReviewRouter } from "../modules/Review/review.route"

const router = Router()
export const moduleRoutes: { path: string; route: any }[] = [
    {
        path: "/movies",
        route: movieRoutes,
    },
    {
        path: "/theaters",
        route: theaterRoutes,
    },
    {
        path: "/shows",
        route: ShowRouter,
    },
    {
        path: "/users",
        route: UserRouter,
    },
    {
        path: "/bookings",
        route: BookingRouter,
    },
    {
        path: "/reviews",
        route: ReviewRouter,
    },
]

moduleRoutes.forEach((ele) => router.use(ele.path, ele.route))

export default router
