import { Router } from 'express'
import { UnitController } from '../controllers/UnitController.js'

export const UnitRouter = ({ unitModel }) => {
    const unitRoute = Router()

    const unitController = new UnitController({ unitModel })

    return unitRoute
}
