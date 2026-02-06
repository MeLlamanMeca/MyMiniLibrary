import { validateRecipe, validateParcialRecipe } from '../schemas/recipe.js'


export class WeaponController {
    
    constructor( {weaponModel} ) {
        this.weaponModel = weaponModel
    }

    getAll = async (req, res) => {
        const recipes = await this.recipeModel.getAll()
        res.json(recipes) 
    }

}



