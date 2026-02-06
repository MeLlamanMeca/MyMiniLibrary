import { Router } from 'express'
import { WeaponController } from '../controllers/WeaponController.js'

export const WeaponRouter = ({ weaponModel }) => {
    const weaponRoute = Router()

    const weaponController = new WeaponController({ weaponModel })

    return weaponRoute
}
