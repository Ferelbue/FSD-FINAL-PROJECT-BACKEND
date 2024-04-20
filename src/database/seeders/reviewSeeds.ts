
import { Review } from "../../models/Review";
import { AppDataSource } from "../db";
import { faker } from '@faker-js/faker';


export const reviewSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        for (let i = 7; i <= 30; i++) {
            const review = Review.create({
                name: faker.person.firstName(),
                description: faker.lorem.sentence(5),
                starts: Math.floor(Math.random() * 5) + 1 ,
                product: { id: Math.floor(Math.random() * 30) + 1 },
            })
            await review.save();
        }

        console.log("---------------------------------------")
        console.log("++++++++ REVIEWS CREADOS (30) +++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



