import { Request, Response } from "express"
import { Product } from "../models/Product"
import { FindOperator, Like } from "typeorm";
import { FavoriteProduct } from "../models/FavoriteProduct";
import { Review } from "../models/Review";
import { Deal } from "../models/Deal";
import fs from "fs";
import { User } from "../models/User";

//GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 100;
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
                relations: ['category', 'owner'],
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    starts: true,
                    totalReviews: true,
                    category: { id: true, name: true },
                    owner: { id: true, name: true }
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
//GET ALL PRODUCTS WITHOUT PAGINATION AND FILTERS
export const getProductsNumber = async (req: Request, res: Response) => {
    try {

        //Consultar en base de datos
        const products = await Product.find(
            {
                select: {
                    id: true,

                }
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
                relations: {
                    owner: true,
                    reviews: true
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
                    reviews: true,
                    owner: { id: true, name: true },
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
                relations: {
                    owner: true
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
                    totalReviews: true,
                    owner: { id: true, name: true }
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
        const user = await User.findOne(
            {
                where:{id:userId}
            }
        )
        const product = await Product.findOne(
            {
                where:{id:parseInt(productId)}
            }       
        );
        
        if (!user || !product) {
            throw new Error('User or product not found');
        }

        const favoriteProduct = await FavoriteProduct.find({
            where: {
                product: product,
                user: user
            },
            relations: ['user', 'product']
        });

        console.log(favoriteProduct)
        if (favoriteProduct.length > 0) {
            const favoriteProductDeleted = await FavoriteProduct.delete(favoriteProduct[0].id);
            return res.status(200).json({
                success: true,
                message: "Product removed from favorites",
                data: favoriteProductDeleted
            })
        }
        if (favoriteProduct.length === 0) {
            const newFavoriteProduct = await FavoriteProduct.create({
                user: user,
                product: product
            }).save()

            return res.status(201).json({
                success: true,
                message: "Product added to favorites",
                data: newFavoriteProduct
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product cant be retrieved",
            error: error
        })
    }
}

export const productFavorite = async (req: Request, res: Response) => {

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
                    product: product,
                    user: { id: userId }
                },
                relations: [
                    'user'
                ],
                select: {
                    user: { id: true }
                }

            }
        )

        // RESPONDER
        res.status(200).json(
            {
                success: true,
                message: "Service retrieved successfully",
                data: favoriteProduct
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


//CREATE REVIEW
export const reviewProduct = async (req: Request, res: Response) => {

    try {
        const productId = parseInt(req.params.id);
        const reviewerId = req.tokenData.userId;
        const reviewerName = req.tokenData.userName;

        const description = req.body.description;
        const starts = req.body.starts;

        //Validar datos
        if (!description || !starts) {
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

        const startsArray = await Review.find({
            where: {
                product: { id: productId }
            },
            select: {
                starts: true
            }
        })

        let startsAverage = 0;
        if (startsArray.length > 0) {
            const arrayStarts = [];
            for (let i = 0; i < startsArray.length; i++) {
                arrayStarts.push(startsArray[i].starts)
            }
            startsAverage = arrayStarts.reduce((a, b) => a + b) / arrayStarts.length;
        }

        // Update product starts
        const product = await Product.findOne({
            where: {
                id: productId
            }
        })
        const productUpdated = await Product.update(
            {
                id: productId
            },
            {
                starts: startsAverage,
                totalReviews: startsArray.length
            }
        )


        res.status(201).json(
            {
                success: false,
                message: "Review registered successfully",
                data: newReview
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Review cant be created",
            error: error
        })
    }
}

// GET PRODUCT REVIEWS
export const productReviews = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const productId = req.params.id
        const arrayReviews = [];
        const arrayStarts = [];

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

        const reviews = await Review.find(
            {
                where: {
                    product: product
                },
                relations: [
                    'reviewer'
                ],
                select: {
                    reviewer: { name: true },
                    description: true,
                    starts: true
                }

            }
        )

        for (let i = 0; i < reviews.length; i++) {
            arrayReviews.push(reviews[i])
            arrayStarts.push(reviews[i].starts)
        }
        let startsAverage = arrayStarts.reduce((a, b) => a + b) / arrayStarts.length;

        // RESPONDER
        res.status(200).json(
            {
                success: true,
                message: "Service retrieved successfully",
                data: arrayReviews, arrayStarts, startsAverage
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

//GET PRODUCT ONE CATEGORY
export const categoryProducts = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const categoryId = req.params.id
        // PAGINACION Y FILTROS
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
        //Consultar y recuperar de la DB
        const products = await Product.find(
            {
                where: {
                    ...queryFilters,
                    category: { id: parseInt(categoryId) }
                },
                relations: [
                    'category',
                    'owner'
                ],
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    city: true,
                    hourPrice: true,
                    dayPrice: true,
                    starts: true,
                    totalReviews: true,
                    category: { id: true, name: true },
                    owner: { id: true, name: true }
                },
                take: limit,
                skip: skip
            }
        )

        if (!products) {
            throw new Error('Product not found');
        }

        // RESPONDER
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

export const getMyFavorites = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        console.log(1)
        const userId = req.tokenData.userId


        //Consultar y recuperar de la DB
        const user = await User.findOne(
            {
                where:{id:userId}
            }
        )
        
        if (!user) {
            throw new Error('User or product not found');
        }

        const favoriteProduct = await FavoriteProduct.find({
            where: {
                user: user
            },
            relations: ['user', 'product']
        });

        console.log(favoriteProduct)
        if (favoriteProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Any product found"
            })
        }
        res.status(200).json(
            {
                success: true,
                message: "Products retrieved successfully",
                data: favoriteProduct
            }
        )



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Productd cant be retrieved",
            error: error
        })
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Missing image",
            })
        }

        function saveImage(image: any) {
            const newPath = `uploads/${image.originalname}`;
            fs.renameSync(image.path, newPath);
            return newPath;
        }
        saveImage(image);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: image
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Image cant be uploaded",
            error: error
        })
    }
}
