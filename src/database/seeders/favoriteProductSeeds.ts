import { FavoriteProduct } from "../../models/FavoriteProduct";
import { AppDataSource } from "../db";


export const favoriteProductSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        for (let i = 1; i <= 30; i++) {
            const product = FavoriteProduct.create({
                user: { id: Math.floor(Math.random() * 10) + 1 },
                product: {id: Math.floor(Math.random() * 30) + 1},
            })
            await product.save();
        }

        console.log("---------------------------------------")
        console.log("+++ FAVORITE PRODUCTS CREADOS (30) ++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



