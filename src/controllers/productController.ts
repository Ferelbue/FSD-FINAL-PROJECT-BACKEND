import { Request, Response } from "express"
import { Product } from "../models/Product"
import { FindOperator, Like } from "typeorm";
import { da, fa, tr } from "@faker-js/faker";
import { FavoriteProduct } from "../models/FavoriteProduct";
import { Review } from "../models/Review";
import { Deal } from "../models/Deal";

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

//MODIFY PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const ownerId = req.tokenData.userId;

        let productName = req.body.name;
        let description = req.body.description;
        let image = req.body.image;
        let city = req.body.city;
        let hourPrice = req.body.hourPrice;
        let dayPrice = req.body.dayPrice;
        let depositPrice = req.body.depositPrice;
        let categoryId = req.body.category;

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

//DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const productId = req.params.id

        const product = await Product.findOneBy({
            id: parseInt(productId)
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const productDeleted = await Product.remove(product)

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
            data: productDeleted
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service can't be deleted",
            error: error
        })
    }
}

//GET MY PRODUCTS
export const addToFavorite = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const userId = req.tokenData.userId
        const productId = req.params.id

        //Consultar y recuperar de la DB
        const product = await Product.findOne(
            {
                where: {
                    id: parseInt(productId)
                }
            }
        )

        if (!product) {
            throw new Error('Product not found');
        }

        const favoriteProduct = await FavoriteProduct.find(
            {
                where: {
                    product: product
                },
                relations: [
                    'user'
                ],
                select: {
                    user: { id: true }
                }

            }
        )
        console.log(favoriteProduct.length)
        let arrayFavoriteProduct = [];

        for (let i = 0; i < favoriteProduct.length; i++) {
            if (favoriteProduct[i].user.id === userId) {

                for (let i = 0; i < favoriteProduct.length; i++) {
                    arrayFavoriteProduct.push(favoriteProduct[i].user.id)
                }

                const favDeleted = await FavoriteProduct.remove(favoriteProduct[i])
                return res.status(200).json({
                    success: true,
                    message: "Product removed from favorites",
                    data: favDeleted, arrayFavoriteProduct
                })

            }
            if (i === favoriteProduct.length - 1) {
                for (let i = 0; i < favoriteProduct.length; i++) {
                    arrayFavoriteProduct.push(favoriteProduct[i].user.id)
                }
                const newFavoriteProduct = await FavoriteProduct.create({
                    user: { id: userId },
                    product: { id: product.id }
                }).save()


                return res.status(200).json({
                    success: true,
                    message: "Product added to favorites",
                    data: newFavoriteProduct, arrayFavoriteProduct
                })
            }
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
export const reviewProduct = async (req: Request, res: Response) => {

    try {
        const productId = parseInt(req.params.id);
        const reviewerId = req.tokenData.userId;
        const reviewerName = req.tokenData.userName;

        const productName = req.body.name;
        const description = req.body.description;
        const starts = req.body.starts;

        //Validar datos
        if (!productName || !description || !starts) {
            return res.status(400).json({
                success: false,
                message: "Missing data",
                data: req.body
            })
        }

        const deal = await Deal.findOne({
            where: {
                product: { id: productId },
                userUser: { id: reviewerId }
            }
        })

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "Not deal found for this product and user",
            })
        }

        if (deal?.userOwner_confirm === false || deal?.userUser_confirm === false) {
            return res.status(403).json({
                success: false,
                message: "You need both users confirm the deal first",
            })
        }
        const newReview = await Review.create({
            name: reviewerName,
            description: description,
            starts: starts,
            product: { id: productId },
            reviewer: { id: reviewerId }
        }).save()

        if (newReview && deal) {
            const dealDeleted = await Deal.delete(deal.id);
        }

        res.status(201).json(
            {
                success: false,
                message: "Product registered successfully",
                data: newReview
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

//GET FAVORITES OF A PRODUCT
export const productFavorites = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const userId = req.tokenData.userId
        const productId = req.params.id
        let arrayFavoriteProduct = [];

        //Consultar y recuperar de la DB
        const product = await Product.findOne(
            {
                where: {
                    id: parseInt(productId)
                }
            }
        )

        if (!product) {
            throw new Error('Product not found');
        }

        const favoriteProduct = await FavoriteProduct.find(
            {
                where: {
                    product: product
                },
                relations: [
                    'user'
                ],
                select: {
                    user: { name: true }
                }

            }
        )

        for (let i = 0; i < favoriteProduct.length; i++) {
            arrayFavoriteProduct.push(favoriteProduct[i].user.name)
        }

        // RESPONDER
        res.status(200).json(
            {
                success: true,
                message: "Service retrieved successfully",
                data: arrayFavoriteProduct
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