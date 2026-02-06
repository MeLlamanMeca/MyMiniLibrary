import { Router } from 'express'
import { WeaponController } from '../controllers/WeaponController.js'

export const WeaponRouter = ({ weaponModel }) => {
    const weaponRoute = Router()

    const weaponController = new WeaponController({ weaponModel })
    weaponRoute.get('/:squadId', weaponController.get)
    weaponRoute.post('/', weaponController.create)
    weaponRoute.patch('/:id', weaponController.update)
    weaponRoute.delete('/:id', weaponController.delete)

    return weaponRoute
}
