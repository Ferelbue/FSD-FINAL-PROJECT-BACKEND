import { faker } from '@faker-js/faker';
import { AppDataSource } from "../db";
import { Product } from '../../models/Product';

export const productSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const product = Product.create({
            name: "taladro",
            description: "Taladro a bateria, gran potencia. Marca Bosch",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 3 },
            owner: { id: 1 },
        })
        await product.save();

        const product2 = Product.create({
            name: "radial",
            description: "Radial a bateria, gran potencia. Marca Bosch",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 11 },
            owner: { id: 3 },
        })
        await product2.save();

        const product3 = Product.create({
            name: "hacha",
            description: "Mando de fibra de carbono, muy ligero y resistente",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 1,
            dayPrice: 5,
            depositPrice: 10,
            category: { id: 1 },
            owner: { id: 3 },
        })
        await product3.save();

        const product4 = Product.create({
            name: "motosierra",
            description: "Motosierra eléctrica, lubricación automática, incluida cadena, velocidad de corte 15 ms, 7800 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 150,
            category: { id: 1 },
            owner: { id: 3 },
        })
        await product4.save();

        const product5 = Product.create({
            name: "desbrozadora",
            description: "Desbrozadora de Gasolina Potencia(cv):1.4,",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 150,
            category: { id: 1 },
            owner: { id: 3 },
        })
        await product5.save();

        const product6 = Product.create({
            name: "cortadora de azulejos",
            description: "Punta de diamante, 800W, 2950 rpm, 180 mm, 25 mm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 150,
            category: { id: 2 },
            owner: { id: 3 },
        })
        await product6.save();

        const product7 = Product.create({
            name: "sierra circular",
            description: "Sierra circular con motor de 1500W y velocidad de 4500 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 200,
            category: { id: 2 },
            owner: { id: 4 },
        })
        await product7.save();
        
        const product8 = Product.create({
            name: "martillo perforador",
            description: "Martillo perforador con energía de impacto de 2.7 J",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 75,
            depositPrice: 150,
            category: { id: 3 },
            owner: { id: 5 },
        })
        await product8.save();

        const product9 = Product.create({
            name: "taladro",
            description: "Taladro a bateria, gran potencia. Marca Bosch",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 3 },
            owner: { id: 6 },
        })
        await product9.save();

        const product10 = Product.create({
            name: "radial",
            description: "Radial a bateria, gran potencia. Marca Bosch",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 11 },
            owner: { id: 7 },
        })
        await product10.save();

        const product11 = Product.create({
            name: "amoladora",
            description: "Amoladora con disco de 115mm y potencia de 850W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 12,
            dayPrice: 60,
            depositPrice: 120,
            category: { id: 4 },
            owner: { id: 8 },
        })
        await product11.save();
        
        const product12 = Product.create({
            name: "lijadora orbital",
            description: "Lijadora orbital con potencia de 300W y velocidad de 12000 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 5 },
            owner: { id: 9 },
        })
        await product12.save();

        const product13 = Product.create({
            name: "taladro percutor",
            description: "Taladro percutor con potencia de 850W y velocidad de 3000 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 75,
            depositPrice: 150,
            category: { id: 6 },
            owner: { id: 10 },
        })
        await product13.save();
        
        const product14 = Product.create({
            name: "cortasetos",
            description: "Cortasetos con longitud de corte de 600mm y potencia de 600W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 12,
            dayPrice: 60,
            depositPrice: 120,
            category: { id: 7 },
            owner: { id: 1 },
        })
        await product14.save();

        const product15 = Product.create({
            name: "soplador de hojas",
            description: "Soplador de hojas con potencia de 3000W y velocidad de aire de 270 km/h",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 50,
            depositPrice: 100,
            category: { id: 8 },
            owner: { id: 2 },
        })
        await product15.save();
        
        const product16 = Product.create({
            name: "aspiradora industrial",
            description: "Aspiradora industrial con capacidad de 30L y potencia de 1500W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 160,
            category: { id: 9 },
            owner: { id: 3 },
        })
        await product16.save();

        const product17 = Product.create({
            name: "motosierra",
            description: "Motosierra con longitud de corte de 40cm y potencia de 2000W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 25,
            dayPrice: 100,
            depositPrice: 200,
            category: { id: 10 },
            owner: { id: 4 },
        })
        await product17.save();
        
        const product18 = Product.create({
            name: "hidrolimpiadora",
            description: "Hidrolimpiadora con presión de 110 bar y potencia de 1400W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 75,
            depositPrice: 150,
            category: { id: 11 },
            owner: { id: 5 },
        })
        await product18.save();

        const product19 = Product.create({
            name: "compresor de aire",
            description: "Compresor de aire con capacidad de 50L y potencia de 1500W",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 160,
            category: { id: 12 },
            owner: { id: 6 },
        })
        await product19.save();
        
        const product20 = Product.create({
            name: "generador eléctrico",
            description: "Generador eléctrico con potencia de 2000W y capacidad de 15L",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 30,
            dayPrice: 120,
            depositPrice: 240,
            category: { id: 13 },
            owner: { id: 7 },
        })
        await product20.save();
        
        const product21 = Product.create({
            name: "soldadora",
            description: "Soldadora con potencia de 140A y peso de 4.7kg",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 25,
            dayPrice: 100,
            depositPrice: 200,
            category: { id: 1 },
            owner: { id: 8 },
        })
        await product21.save();
        
        const product22 = Product.create({
            name: "escalera telescópica",
            description: "Escalera telescópica con longitud máxima de 5m y capacidad de 150kg",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 40,
            depositPrice: 80,
            category: { id: 2 },
            owner: { id: 9 },
        })
        await product22.save();

        const product23 = Product.create({
            name: "desbrozadora",
            description: "Desbrozadora con potencia de 1000W y diámetro de corte de 42cm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 120,
            category: { id: 3 },
            owner: { id: 10 },
        })
        await product23.save();
        
        const product24 = Product.create({
            name: "rotocultor",
            description: "Rotocultor con potencia de 1400W y ancho de trabajo de 40cm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 160,
            category: { id: 4 },
            owner: { id: 1 },
        })
        await product24.save();
        
        const product25 = Product.create({
            name: "pulidora",
            description: "Pulidora con potencia de 1200W y velocidad de 3000 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 120,
            category: { id: 5 },
            owner: { id: 2 },
        })
        await product25.save();
        
        const product26 = Product.create({
            name: "fresadora",
            description: "Fresadora con potencia de 1200W y velocidad de 10000 rpm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 160,
            category: { id: 6 },
            owner: { id: 3 },
        })
        await product26.save();

        const product27 = Product.create({
            name: "sierra circular",
            description: "Sierra circular con potencia de 1200W y diámetro de disco de 190mm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 15,
            dayPrice: 60,
            depositPrice: 120,
            category: { id: 7 },
            owner: { id: 4 },
        })
        await product27.save();
        
        const product28 = Product.create({
            name: "martillo perforador",
            description: "Martillo perforador con potencia de 800W y energía de impacto de 2.7J",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 20,
            dayPrice: 80,
            depositPrice: 160,
            category: { id: 8 },
            owner: { id: 5 },
        })
        await product28.save();
        
        const product29 = Product.create({
            name: "sierra de calar",
            description: "Sierra de calar con potencia de 650W y profundidad de corte de 90mm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 10,
            dayPrice: 40,
            depositPrice: 80,
            category: { id: 9 },
            owner: { id: 6 },
        })
        await product29.save();
        
        const product30 = Product.create({
            name: "sierra de mesa",
            description: "Sierra de mesa con potencia de 1800W y diámetro de disco de 250mm",
            image: "defaultHta.png",
            city: "Valencia",
            starts:0,
            hourPrice: 25,
            dayPrice: 100,
            depositPrice: 200,
            category: { id: 10 },
            owner: { id: 7 },
        })
        await product30.save();

        console.log("---------------------------------------")
        console.log("++++++++ PRODUCTS CREADOS (30) ++++++++")
        console.log("---------------------------------------")

    } catch (error) {
        console.log(error);

    } finally {
        await AppDataSource.destroy()
    }
}



