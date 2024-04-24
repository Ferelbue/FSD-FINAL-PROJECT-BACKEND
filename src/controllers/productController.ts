import { Request, Response } from "express"
import { Product } from "../models/Product"
import { FindOperator, Like } from "typeorm";
import { da, tr } from "@faker-js/faker";

//GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;

        interface queryFilters {
            name?: FindOperator<string>
        }
        const queryFilters: queryFilters = {}
        if (req.query.name) {
            queryFilters.name = Like("%" + req.query.name.toString() + "%");
        }

        //Consultar en base de datos
        const products = await Product.find(
            {
                where: queryFilters,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    starts: true,
                },
                take: limit,
                skip: skip
            }
        )
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Any product found"
            })
        }
        res.status(200).json(
            {
                success: true,
                message: "Products retrieved successfully",
                data: products
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Products cant be retrieved",
            error: error
        })
    }
}

//GET ONE PRODUCT
export const getProductById = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const productId = req.params.id

        //Consultar y recuperar de la DB
        const product = await Product.findOne(
            {
                where: {
                    id: parseInt(productId)
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    depositPrice: true,
                    starts: true,
                }
            }
        )

        // VALIDAR
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",

            })
        }


        // RESPONDER
        res.status(200).json(
            {
                success: true,
                message: "Product retrieved successfully",
                data: product
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product cant be retrieved",
            error: error
        })
    }
}

//GET MY PRODUCTS
export const getMyProducts = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const userId = req.tokenData.userId
        //Consultar y recuperar de la DB
        const product = await Product.find(
            {
                where: {
                    owner: { id: userId }
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    depositPrice: true,
                    starts: true,
                }
            }
        )

        // VALIDAR
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service not found",

            })
        }

        // RESPONDER
        res.status(200).json(
            {
                success: true,
                message: "Service retrieved successfully",
                data: product
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Service cant be retrieved",
            error: error
        })
    }
}

//CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {

    try {
        const productName = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const city = req.body.city;
        const hourPrice = req.body.hourPrice;
        const dayPrice = req.body.dayPrice;
        const depositPrice = req.body.depositPrice;
        const categoryId = req.body.category;
        const ownerId = req.tokenData.userId;

        //Validar datos
        if (!productName || !description || !image || !city || !hourPrice || !dayPrice || !depositPrice || !categoryId || !ownerId) {
            return res.status(400).json({
                success: false,
                message: "Missing data",
                data: req.body
            })
        }

        const newProduct = await Product.create({
            name: productName,
            description: description,
            image: image,
            city: city,
            hourPrice: hourPrice,
            dayPrice: dayPrice,
            depositPrice: depositPrice,
            category: { id: categoryId },
            owner: { id: ownerId }
        }).save()

        console.log(newProduct)
        res.status(201).json(
            {
                success: false,
                message: "Product registered successfully",
                data: newProduct
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product cant be created",
            error: error
        })
    }
}

//MODIFY SERVICE
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        let productName = req.body.name;
        let description = req.body.description;
        let image = req.body.image;
        let city = req.body.city;
        let hourPrice = req.body.hourPrice;
        let dayPrice = req.body.dayPrice;
        let depositPrice = req.body.depositPrice;
        let categoryId = req.body.category;
        const ownerId = req.tokenData.userId;


        console.log(productId)
        console.log(ownerId, "ownerId")
        //Validar datos
        const product = await Product.find(
            {
                where: {
                    id: parseInt(productId),
                },
                relations: {
                    owner: true,
                    category: true
                },
                select: {
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    depositPrice: true,
                    owner: { id: true },
                    category: { id: true },
                }
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",

            })

        }

        if (product[0].owner.id !== ownerId) {
            return res.status(403).json({
                success: false,
                message: "You are not the owner of this product",
            })
        }

        // Tratar datos
        if (!productName) {
            productName = product[0].name
        }
        if (!description) {
            description = product[0].description
        }
        if (!image) {
            image = product[0].image
        }
        if (!city) {
            city = product[0].city
        }
        if (!hourPrice) {
            hourPrice = product[0].hourPrice
        }
        if (!dayPrice) {
            dayPrice = product[0].dayPrice
        }
        if (!depositPrice) {
            depositPrice = product[0].depositPrice
        }
        if (!categoryId) {
            categoryId = product[0].category.id
        }

        // Actualizar datos
        const serviceUpdated = await Product.update(
            {
                id: parseInt(productId)
            },
            {
                name: productName,
                description: description,
                image: image,
                city: city,
                hourPrice: hourPrice,
                dayPrice: dayPrice,
                depositPrice: depositPrice,
                category: { id: categoryId },
                owner: { id: ownerId }
            },

        )

        const servicePrint = await Product.findOneBy(
            {
                id: parseInt(productId)
            }
        )


        // Responder
        res.status(200).json(
            {
                success: true,
                message: "Product updated successfully",
                data: servicePrint
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product cant be update",
            error: error
        })
    }
}

// //DELETE SERVICE
// export const deleteProduct = async (req: Request, res: Response) => {

//     try {
//         const userId = req.params.id

//         const user = await Service.findOneBy({
//             id: parseInt(userId)
//         })
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Service not found"
//             })
//         }

//         const userDeleted = await Service.remove(user)

//         return res.status(200).json({
//             success: true,
//             message: "Service deleted successfully",
//             data: userDeleted
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Service can't be deleted",
//             error: error
//         })
//     }
// }

// 