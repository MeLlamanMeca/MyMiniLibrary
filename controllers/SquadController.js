import { validateSquad, validateParcialSquad } from '../schemas/squad.js'


export class SquadController {
    
    constructor({ squadModel }) {
        this.squadModel = squadModel
    }

    get = async (req, res) => {
        const { id } = req.params;
        
        const squad = await this.squadModel.find({ id })
    
        if(!squad) return res.status(404).json({message: 'Error al obtener la información del escuadrón'})
        res.json(squad)
    }

    create = async (req, res) => {
        const result = validateSquad(req.body)
        if(!result.success) return res.status(400).json({message: 'Invalid data'})

        const newSquad = await this.squadModel.create(result.data)

        if(!newSquad) return res.status(400).json({message: 'Error al crear el escuadrón'})
        res.json(newSquad)
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validateParcialSquad(req.body)
        if(!result.success) return res.status(400).json({message: 'Invalid data'})
        result.data.id = id

        const updatedSquad = await this.squadModel.update(result.data)

        if(!updatedSquad) return res.status(400).json({message: 'Error al actualizar el escuadrón'})
        res.json(updatedSquad)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const deletedSquad = await this.squadModel.delete({ id })

        if(!deletedSquad) return res.status(400).json({message: 'Error al eliminar el escuadrón'})
        res.json(deletedSquad)
    }
}



