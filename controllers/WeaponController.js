import { validateWeapon, validateParcialWeapon } from '../schemas/weapon.js'


export class WeaponController {
    
    constructor( {weaponModel} ) {
        this.weaponModel = weaponModel
    }

    get = async (req, res) => {
        const { id } = req.params
        
        const weapons = await this.weaponModel.find({ id })

        if(!weapons) { return res.status(404).json({ message: 'Weapons not found' }) }
        res.status(200).json(weapons)
    }

    create = async (req, res) => {
        const result = validateWeapon(req.body)
        if(!result.success) { return res.status(400).json({ message: 'Invalid weapon' }) }

        const createdWeapon = await this.weaponModel.create(result.data)

        if(!createdWeapon) { return res.status(400).json({ message: 'Weapon not created' }) }
        res.status(201).json(createdWeapon)
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validateParcialWeapon(req.body)
        if(!result.success) { return res.status(400).json({ message: 'Invalid weapon' }) }
        result.data.id = id;

        const updatedWeapon = await this.weaponModel.update(result.data)

        if(!updatedWeapon) { return res.status(404).json({ message: 'Weapon not found' }) }
        res.status(200).json(updatedWeapon)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const deletedWeapon = await this.weaponModel.findByIdAndDelete(id)

        if(!deletedWeapon) { return res.status(404).json({ message: 'Weapon not found' }) }
        res.status(200).json(deletedWeapon)
    }

}



