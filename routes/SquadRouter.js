import { Router } from 'express'
import { SquadController } from '../controllers/SquadController.js'

export const SquadRouter = ({ squadModel }) => {
    const squadRoute = Router()

    const squadController = new SquadController({ squadModel })

    squadRoute.get('/:id', squadController.get)
    squadRoute.post('/', squadController.create)
    squadRoute.patch('/:id', squadController.update)
    squadRoute.delete('/:id', squadController.delete)

    return squadRoute
}
