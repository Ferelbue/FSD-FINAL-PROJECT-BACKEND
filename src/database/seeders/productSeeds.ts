import { faker } from '@faker-js/faker';
import { AppDataSource } from "../db";
import { Product } from '../../models/Product';

export const productSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const product = Product.create({
            name: "taladro",
            description: "Taladro a bateria, gran potencia. Marca Bosch",
            image: faker.image.urlLoremFlickr({ category: 'people' }),
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG",
            role: { id: 1 }
        })
        await user.save();

        console.log("---------------------------------------")
        console.log("++++++++ USUARIOS CREADOS (10) ++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



