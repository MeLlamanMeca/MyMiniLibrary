import { Router } from "express";
import { MiniController } from "../controllers/MiniController.js";
import { corsPublic, corsPrivate } from "../middlewares/CorsOptions.js";
import { enforcePrivateOrigin } from "../middlewares/EnforcePrivateOrigin.js";

export const MiniRouter = ({ miniModel }) => {
  const MiniRoute = Router();

  const miniController = new MiniController({ miniModel });

  MiniRoute.get("/:id", corsPublic, miniController.getMini);
  MiniRoute.post("/", corsPrivate, enforcePrivateOrigin, miniController.createMini);
  MiniRoute.patch("/:id", corsPrivate, enforcePrivateOrigin, miniController.updateMini);
  MiniRoute.delete("/:id", corsPrivate, enforcePrivateOrigin, miniController.deleteMini);

  return MiniRoute;
};
