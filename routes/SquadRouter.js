import { Router } from 'express'
import { SquadController } from '../controllers/SquadController.js'

export const SquadRouter = ({ squadModel }) => {
    const squadRoute = Router()

    const squadController = new SquadController({ squadModel })

    return squadRoute
}
