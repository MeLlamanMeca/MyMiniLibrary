import { Router } from 'express'
import { UnitController } from '../controllers/UnitController.js'

export const UnitRouter = ({ unitModel }) => {
    const unitRoute = Router()

    const unitController = new UnitController({ unitModel })

    unitRoute.get('/:id', unitController.get)
    unitRoute.get('/:name', unitController.getByName)
    unitRoute.get('/:userId', unitController.getByUser)

    unitRoute.post('/', unitController.create)
    unitRoute.patch('/:id', unitController.update)
    unitRoute.delete('/:id', unitController.delete)

    return unitRoute
}
