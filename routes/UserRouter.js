import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

export const UserRouter = ({ userModel }) => {
    const userRoute = Router()

    const userController = new UserController({ userModel })

    userRoute.get('/', userController.getAll)
    userRoute.get('/:id', userController.getUserById)
    userRoute.post("/auth/verify", userController.verify)
    userRoute.post('/', userController.create)

    return userRoute
}
