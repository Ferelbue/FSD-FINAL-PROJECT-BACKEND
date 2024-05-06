
import { Message } from "../../models/Message";
import { AppDataSource } from "../db";
import { faker } from '@faker-js/faker';


export const messageSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        for (let i = 1; i <= 30; i++) {
            const message = Message.create({
                message: faker.lorem.sentence(7),
                userOwner: { id: Math.floor(Math.random() * 10) + 1 },
                userUser: { id: Math.floor(Math.random() * 10) + 1 },
                product: { id: Math.floor(Math.random() * 30) + 1 },
            })
            await message.save();
        }

        console.log("---------------------------------------")
        console.log("++++++++ MESSAGES CREADOS (50) ++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



