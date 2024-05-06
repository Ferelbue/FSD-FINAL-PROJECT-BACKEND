import { faker } from '@faker-js/faker';
import { User } from "../../models/User";
import { AppDataSource } from "../db";

export const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const user = User.create({
            name: "user",
            lastName: "user",
            email: "user@user.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG",
            role: { id: 1 }
        })
        await user.save();

        const user2 = User.create({
            name: "admin",
            lastName: "admin",
            email: "admin@admin.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG",
            role: { id: 2 }
        })
        await user2.save();

        const user3 = User.create({
            name: "super",
            lastName: "super",
            email: "super@super.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG",
            role: { id: 3 }
        })
        await user3.save();

        const user4 = User.create({
            name: "Fernando",
            lastName: "Elegido",
            email: "fernando@fernando.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG",
            role: { id: 3 }
        })
        await user4.save();

        const user5 = User.create({
            name: "Marta",
            lastName: "Santes",
            email: "marta@marta.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user5.save();
        
        const user6 = User.create({
            name: "Lola",
            lastName: "Eletes",
            email: "lola@lola.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user6.save();
        
        const user7 = User.create({
            name: "Ruben",
            lastName: "Gomez",
            email: "ruben@ruben.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user7.save();
        
        const user8 = User.create({
            name: "David",
            lastName: "Garcia",
            email: "david@david.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user8.save();
        
        const user9 = User.create({
            name: "Pepa",
            lastName: "Perez",
            email: "pepa@pepa.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user9.save();
        
        const user10 = User.create({
            name: "Pepe",
            lastName: "Perez",
            email: "pepe@pepe.com",
            city: "Valencia",
            passwordHash: "$2b$08$lV2.D7/ibyEeWGbaJibeb.FknmnrSlcfpsYfNqbgZJJ0pKolyvObG"
        })
        await user10.save();

        console.log("---------------------------------------")
        console.log("++++++++ USUARIOS CREADOS (10) ++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



