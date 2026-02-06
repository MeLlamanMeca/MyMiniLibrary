import { Router } from 'express'
import { weaponController } from '../controllers/weaponController.js'

export const WeaponRouter = ({ weaponModel }) => {
    const weaponRoute = Router()

    const weaponController = new weaponController({ weaponModel })

    weaponRoute.get('/', weaponController.getAll)
    weaponRoute.get('/id=:id', weaponController.getById)
    weaponRoute.get('/weaponname=:weaponname', weaponController.getByweaponname)
    weaponRoute.get('/weaponId=:weaponId', weaponController.getByweaponId)
    weaponRoute.post('/', weaponController.create)

    return weaponRouter
}
