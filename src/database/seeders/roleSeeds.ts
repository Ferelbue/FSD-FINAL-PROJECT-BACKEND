import { Role } from "../../models/Role";
import { AppDataSource } from "../db";


export const roleSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const roleUser = Role.create({
            id: 1,
            name: "user"
        })
        await roleUser.save();

        const roleAdmin = Role.create({
            id: 2,
            name: "admin"
        })
        await roleAdmin.save();

        const roleSuperAdmin = Role.create({
            id: 3,
            name: "super-admin"
        })
        await roleSuperAdmin.save();

        console.log("---------------------------------------")
        console.log("++++++++++ ROLES CREADOS (3) ++++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



