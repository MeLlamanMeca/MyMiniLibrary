import express from 'express'
import { UnitRouter } from './routers/unitRouter.js'
import { UserRouter } from './routers/userRouter.js'
import { SquadRouter } from './routers/squadRouter.js'
import { WeaponRouter } from './routers/weaponRouter.js'
//import dotenv from 'dotenv';

export const WhScannerApp = ({ unitModel, userModel, squadModel, weaponModel }) => {
  const app = express()
  app.use(express.json())
  //app.use(corsMiddleware()) //todo
  app.disable('x-powered-by')

  app.use('/units', UnitRouter({ unitModel : unitModel }))
  app.use('/users', UserRouter({ userModel : userModel }))
  app.use('/squads', SquadRouter({ squadModel: squadModel }))
  app.use('/weapons', WeaponRouter({ weaponModel: weaponModel }))

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`)
  })
}
