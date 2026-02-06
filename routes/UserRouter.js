import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

export const UserRouter = ({ userModel }) => {
    const userRoute = Router()

    const userController = new UserController({ userModel })

    userRoute.get('/', userController.getAll)
    userRoute.get('/id=:id/info', userController.getInfoById)
    userRoute.post("/auth/verify", userController.verify)
    userRoute.post('/create', userController.create)

    return userRoute
}
