import { Router } from "express";
import { MiniController } from "../controllers/MiniController.js";
import { corsPublic, corsPrivate } from "../middlewares/CorsOptions.js";

export const MiniRouter = ({ miniModel }) => {
  const MiniRoute = Router();

  const miniController = new MiniController({ miniModel });

  MiniRoute.get("/:id", corsPublic, miniController.getMini);
  MiniRoute.post("/", corsPrivate, miniController.createMini);
  MiniRoute.patch("/:id", corsPrivate, miniController.updateMini);
  MiniRoute.delete("/:id", corsPrivate, miniController.deleteMini);

  return MiniRoute;
};
