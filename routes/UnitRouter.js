import { Router } from 'express'
import { unitController } from '../controllers/unitController.js'

export const UnitRouter = ({ unitModel }) => {
    const unitRoute = Router()

    const unitController = new unitController({ unitModel })

    unitRoute.get('/', unitController.getAll)
    unitRoute.get('/id=:id', unitController.getById)
    unitRoute.get('/unitname=:unitname', unitController.getByunitname)
    unitRoute.get('/unitId=:unitId', unitController.getByunitId)
    unitRoute.post('/', unitController.create)

    return unitRouter
}
