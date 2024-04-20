import { Deal } from "../../models/Deal";
import { AppDataSource } from "../db";


export const dealSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        for (let i = 1; i <= 30; i++) {
            const product = Deal.create({
                userOwner: { id: Math.floor(Math.random() * 10) + 1 },
                userUser: { id: Math.floor(Math.random() * 10) + 1 },
                product: {id: Math.floor(Math.random() * 30) + 1},
            })
            await product.save();
        }

        console.log("---------------------------------------")
        console.log("+++++++++ DEALS CREADOS (30) ++++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



