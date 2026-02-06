import { validateUser, validateParcialUser } from '../schemas/user.js'


export class UserController {
    
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getAll = async (req, res) => {
        const users = await this.userModel.getAll()
        res.json(users)
    }

    getInfoByID = async (req, res) => {
        const { id } = req.params

        const info = await this.userModel.getInfo({ id })

        if(!info) return res.status(404).json({message: 'Error al obtener la información del usuario'})
        res.json(info)
    }

    verify = async (req, res) => {
        const result = validateParcialUser(req.body)
        if(!result) return res.status(400).json({message: 'Invalid data'})

        const userData = await this.userModel.verify(result)

        if(!userData) return res.status(400).json({message: 'Error al verificar el usuario'})
        res.json(userData)
    }

    create = async (req, res) => {
        const result = validateUser(req.body)
        if(!result) return res.status(400).json({message: 'Invalid data'})

        const newUser = await this.userModel.create(result)
        
        if(!newUser) return res.status(400).json({message: 'Error al crear el usuario'})
        res.json(newUser)
    }
}



