//import { validateMini, validateParcialMini } from '../schemas/mini.js'

export class MiniController {
  constructor({ miniModel }) {
    this.miniModel = miniModel;
  }

  getMini = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

      const mini = await this.miniModel.get({ id });
      if (!mini) return res.status(404).json({ error: "Mini not found" });

      res.json(mini);
    } catch (error) {
      next(error);
    }
  };

  createMini = async (req, res, next) => {
    try {
      res.status(201).json({ message: "In progress" });
    } catch (error) {
      next(error);
    }
  };

  updateMini = async (req, res, next) => {
    try {
      res.status(200).json({ message: "In progress" });
    } catch (error) {
      next(error);
    }
  };

  deleteMini = async (req, res, next) => {
    try {
      res.status(200).json({ message: "In progress" });
    } catch (error) {
      next(error);
    }
  };
}
