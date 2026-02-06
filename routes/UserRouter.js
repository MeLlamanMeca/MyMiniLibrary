import { Router } from 'express'
import { userController } from '../controllers/UserController.js'

export const UserRouter = ({ userModel }) => {
    const userRoute = Router()

    const userController = new userController({ userModel })

    userRoute.get('/', userController.getAll)
    userRoute.get('/id=:id/info', userController.getInfoById)
    userRoute.post("/auth/verify", userController.verify)
    userRoute.post('/create', userController.create)

    return userRouter
}
