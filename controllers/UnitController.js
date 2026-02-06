import { validateUnit, validateParcialUnit } from '../schemas/unit.js'


export class UnitController {
    
    constructor({ unitModel }) {
        this.unitModel = unitModel
    }

    getByUser = async (req, res) => {
        const { userId } = req.params
        const { faction, subfaction } = req.query

        const filter = { userId };
        if (faction) filter.faction = faction;
        if (subfaction) filter.subfaction = subfaction;
           
        const units = await this.unitModel.findByUser(filter);
        res.json(units);
    }

    get = async (req, res) => {
        const { id } = req.params

        const info = await this.unitModel.find({ id })

        if(!info) return res.status(404).json({message: 'Error al obtener la información del usuario'})
        res.json(info)
    }
    
    getByName = async (req, res) => {
        const { name } = req.params

        const info = await this.unitModel.findByName({ name })

        if(!info) return res.status(404).json({message: 'Error al obtener la información del usuario'})
        res.json(info)
    }

    create = async (req, res) => {
        const result = validateUnit(req.body)
        if(!result.success) return res.status(400).json({message: 'Invalid data'})

        const newUnit = await this.unitModel.create(result.data)
        
        if(!newUnit) return res.status(400).json({message: 'Error al crear la unidad'})
        res.json(newUnit)
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validateParcialUnit(req.body)
        if(!result.success) return res.status(400).json({message: 'Invalid data'})
        result.id = id

        const updatedUnit = await this.unitModel.update(result.data)

        if(!updatedUnit) return res.status(400).json({message: 'Error al actualizar la unidad'})
        res.json(updatedUnit)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const deletedUnit = await this.unitModel.delete({ id })

        if(!deletedUnit) return res.status(400).json({message: 'Error al eliminar la unidad'})
        res.json(deletedUnit)
    }
}



