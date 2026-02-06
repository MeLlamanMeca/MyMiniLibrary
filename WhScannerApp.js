import express from 'express'
import { UnitRouter } from './routes/UnitRouter.js'
import { UserRouter } from './routes/UserRouter.js'
import { SquadRouter } from './routes/SquadRouter.js'
import { WeaponRouter } from './routes/WeaponRouter.js'

export const WhScannerApp = ({ unitModel, userModel, squadModel, weaponModel }) => {
  const app = express()
  app.use(express.json())
  //app.use(corsMiddleware()) //todo
  app.disable('x-powered-by')

  app.use('/units', UnitRouter({ unitModel : unitModel }))
  app.use('/users', UserRouter({ userModel : userModel }))
  app.use('/squads', SquadRouter({ squadModel: squadModel }))
  app.use('/weapons', WeaponRouter({ weaponModel: weaponModel }))

  const PORT = process.env.API_PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`)
  })
}
