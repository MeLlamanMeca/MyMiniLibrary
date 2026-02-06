import { Router } from 'express'
import { squadController } from '../controllers/squadController.js'

export const SquadRouter = ({ squadModel }) => {
    const squadRoute = Router()

    const squadController = new squadController({ squadModel })

    squadRoute.get('/', squadController.getAll)
    squadRoute.get('/id=:id', squadController.getById)
    squadRoute.get('/squadname=:squadname', squadController.getBysquadname)
    squadRoute.get('/squadId=:squadId', squadController.getBysquadId)
    squadRoute.post('/', squadController.create)

    return squadRouter
}
