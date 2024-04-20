import { Category } from "../../models/Category";
import { AppDataSource } from "../db";


export const categorySeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const productCategory1 = Category.create({
            id: 1,
            name: "agrícola"
        })
        await productCategory1.save();

        const productCategory2 = Category.create({
            id: 2,
            name: "construcción"
        })
        await productCategory2.save();

        const productCategory3 = Category.create({
            id: 3,
            name: "bricolaje"
        })
        await productCategory3.save();

        const productCategory4 = Category.create({
            id: 4,
            name: "capintería"
        })
        await productCategory4.save();

        const productCategory5 = Category.create({
            id: 5,
            name: "electricidad"
        })
        await productCategory5.save();

        const productCategory6 = Category.create({
            id: 6,
            name: "fontanería"
        })
        await productCategory6.save();

        const productCategory7 = Category.create({
            id: 7,
            name: "medición"
        })
        await productCategory7.save();

        const productCategory8 = Category.create({
            id: 8,
            name: "jardinería"
        })
        await productCategory8.save();

        const productCategory9 = Category.create({
            id: 9,
            name: "limpieza"
        })
        await productCategory9.save();

        const productCategory10 = Category.create({
            id: 10,
            name: "llaves manuales"
        })
        await productCategory10.save();

        const productCategory11 = Category.create({
            id: 11,
            name: "metal"
        })
        await productCategory11.save();

        const productCategory12 = Category.create({
            id: 12,
            name: "pintura"
        })
        await productCategory12.save();

        const productCategory13 = Category.create({
            id: 13,
            name: "movimiento-carga"
        })
        await productCategory13.save();

        console.log("---------------------------------------")
        console.log("++++++++++ CATEGORIES CREADAS (13) ++++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



