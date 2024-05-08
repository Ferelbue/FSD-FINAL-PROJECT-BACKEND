import { Request, Response, response } from "express"
import { FindOperator, Like } from "typeorm";
import { Product } from "../models/Product"
import { Deal } from "../models/Deal";
import { Message } from "../models/Message";

//GET ALL CHATS
export const getUserChats = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const productId = req.params.id;

        // Consultar en base de datos
        const messages = await Message.createQueryBuilder("message")
            .leftJoinAndSelect("message.userOwner", "userOwner")
            .leftJoinAndSelect("message.userUser", "userUser")
            .leftJoinAndSelect("message.product", "product")
            .where("userOwner.id = :userId", { userId })
            .orWhere("userUser.id = :userId", { userId })
            .select([
                "message.message",
                "userOwner.id",
                "userOwner.name",
                "userUser.id",
                "userUser.name",
                "product.id",
                "product.name",
                "product.image",
                "message.userOwner_notification",
                "message.userUser_notification",
                "message.updated_at"
            ])
            .orderBy("message.updated_at", "DESC")
            .getMany();


        res.status(200).json(
            {
                success: true,
                message: "Products retrieved successfully",
                data: messages
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

//GET CHAT BY PRODUCT AND USER
export const getMessages = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const productId = req.params.productId;
        const userId = req.tokenData.userId;
        const userUser = req.params.userUserId;

        //Consultar y recuperar de la DB
        const product = await Product.find(
            {
                where: {
                    id: parseInt(productId)
                },
                relations: {
                    owner: true
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    owner: { id: true }
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

        if (product[0].owner.id === userId) {
            const messages = await Message.find(
                {
                    where: {
                        product: { id: parseInt(productId) },
                        userUser: { id: parseInt(userUser) }
                    },
                    relations: {
                        userOwner: true,
                        userUser: true
                    },
                    select: {
                        message: true,
                        userOwner: { id: true, name: true },
                        userUser: { id: true, name: true },
                        userOwner_author: true,
                        userUser_author: true,
                        updated_at: true
                    }
                }
            )
            return res.status(200).json(
                {
                    success: true,
                    message: "Messages retrieved successfully",
                    data: messages
                }
            )
        }

        if (product[0].owner.id !== userId) {
            const messages = await Message.find(
                {
                    where: {
                        product: { id: parseInt(productId) },
                        userUser: { id: userId }
                    },
                    relations: {
                        userOwner: true,
                        userUser: true
                    },
                    select: {
                        message: true,
                        userOwner_author: true,
                        userOwner: { id: true, name: true },
                        userUser: { id: true, name: true },
                        userUser_author: true,
                        updated_at: true
                    }
                }
            )
            return res.status(200).json(
                {
                    success: true,
                    message: "Messages retrieved successfully",
                    data: messages
                }
            )
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

//CREATE PRODUCT
export const createMessage = async (req: Request, res: Response) => {

    try {
        const message = req.body.message;
        const userId = req.tokenData.userId;
        const productId = req.params.productId;
        const userUserId = req.params.userUserId;

        //Validar datos
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            })
        }

        const product = await Product.findOne(
            {
                where: {
                    id: parseInt(productId)
                },
                relations: {
                    owner: true
                },
                select: {
                    id: true,
                    owner: { id: true }
                }
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.owner.id === userId) {
            const newMessage = await Message.create({
                message: message,
                userOwner: { id: userId },
                userUser: { id: parseInt(userUserId) },
                product: { id: parseInt(productId) },
                userUser_notification: true,
                userOwner_author: true,
            }).save()

            const deal = await Deal.findOne(
                {
                    where: {
                        product: { id: parseInt(productId) },
                        userOwner: { id: userId },
                        userUser: { id: parseInt(userUserId) }
                    }
                }
            )
            if (!deal) {
                await Deal.create({
                    product: { id: parseInt(productId) },
                    userOwner: { id: userId },
                    userUser: { id: parseInt(userUserId) }
                }).save()
            }

            return res.status(201).json(
                {
                    success: true,
                    message: "Message registered successfully",
                    data: newMessage
                }
            )
        }

        if (product.owner.id !== userId) {
            const newMessage = await Message.create({
                message: message,
                userOwner: { id: product.owner.id },
                userUser: { id: userId },
                product: { id: parseInt(productId) },
                userOwner_notification: true,
                userUser_author: true,
            }).save()

            const deal = await Deal.findOne(
                {
                    where: {
                        product: { id: parseInt(productId) },
                        userOwner: { id: product.owner.id },
                        userUser: { id: userId }
                    }
                }
            )
            if (!deal) {
                await Deal.create({
                    product: { id: parseInt(productId) },
                    userOwner: { id: product.owner.id },
                    userUser: { id: userId }
                }).save()
            }

            return res.status(201).json(
                {
                    success: true,
                    message: "Message registered successfully",
                    data: newMessage
                }
            )
        }

        res.status(201).json(
            {
                success: false,
                message: "Message registered successfully",
                data: product
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Message cant be created",
            error: error
        })
    }
}

//DELETE PRODUCT
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req.tokenData.userId;
        const userRole = req.tokenData.roleName;
        const message = await Message.findOne(
            {
                where: {
                    id: parseInt(id)
                },
                relations: {
                    userOwner: true,
                    userUser: true
                },
                select: {
                    id: true,
                    userOwner: { id: true },
                    userUser: { id: true },
                    userUser_author: true,
                    userOwner_author: true
                }
            }
        )
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            })
        }


        if ((message.userOwner_author === true && message.userOwner.id === userId) ||
            (message.userUser_author === true && message.userUser.id === userId) ||
            userRole === "admin") {

            await Message.delete(parseInt(id))
            return res.status(200).json({
                success: true,
                message: "Message deleted successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this message"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Message cant be deleted",
            error: error
        })
    }
}

//GET CHAT BY PRODUCT AND USER
export const notification = async (req: Request, res: Response) => {



    try {
        //RECUPERAR DATOS
        const productId = req.params.productId;
        const userId = req.tokenData.userId;
        //Consultar y recuperar de la DB
        const messages = await Message.find(
            {
                where: {
                    userUser: { id: userId },
                    userUser_notification: true
                },
                relations: {
                    product: true,
                },
                select: {
                    userOwner_author: true,
                    userUser_author: true,
                    product: { id: true }
                }
            }

        )

        const messages2 = await Message.find(
            {
                where: {
                    userOwner: { id: userId },
                    userOwner_notification: true
                },
                relations: {
                    product: true,
                },
                select: {
                    userOwner_author: true,
                    userUser_author: true,
                    product: { id: true }
                }
            }
        )
        let arrayFinal = []
        arrayFinal.push(messages, messages2)
        // arrayFinal.push(messages2)

        return res.status(200).json(
            {
                success: true,
                message: "Messages retrieved successfully",
                data: arrayFinal
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Message cant be deleted",
            error: error
        })
    }
}

export const eraseNotification = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const productId = req.params.productId;
        const userUserId = req.params.userUserId;

        const product = await Product.findOne(
            {
                where: {
                    id: parseInt(productId)
                },
                relations: {
                    owner: true
                },
                select: {
                    id: true,
                    owner: { id: true }
                }
            }
        )


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.owner.id === userId) {
            const messages = await Message.find(
                {
                    where: {
                        userUser: { id: parseInt(userUserId) },
                        product: { id: parseInt(productId) }
                    },
                    relations: {
                        product: true,
                    },
                    select: {
                        id: true,
                        userUser_notification: true,
                        userOwner_notification: true,
                        product: { id: true }
                    }
                }
            )
            for (let i = 0; i < messages.length; i++) {
                await Message.update(messages[i].id, { userOwner_notification: false })
            }

            return res.status(200).json(
                {
                    success: true,
                    message: "Notifications deleted successfully",
                }
            )
        } else {
            const messages = await Message.find(
                {
                    where: {
                        userUser: { id: parseInt(userUserId) },
                        product: { id: parseInt(productId) }
                    },
                    relations: {
                        product: true,
                    },
                    select: {
                        id: true,
                        userUser_notification: true,
                        userOwner_notification: true,
                        product: { id: true }
                    }
                }
            )
            for (let i = 0; i < messages.length; i++) {
                await Message.update(messages[i].id, { userUser_notification: false })
            }

            return res.status(200).json(
                {
                    success: true,
                    message: "Notifications deleted successfully",
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Notifications cant be deleted",
            error: error
        })
    }
}

export const BringAllMessages = async (req: Request, res: Response) => {
    try {
        const userRole = req.tokenData.roleName;

        if (userRole !== "user") {

            const messages = await Message.find(
                {
                    relations: {
                        userOwner: true,
                        userUser: true,
                        product: true
                    },
                    select: {
                        id: true,
                        message: true,
                        userOwner: { id: true, name: true },
                        userUser: { id: true, name: true },
                        product: { id: true, name: true }
                    }
                }
            )
            return res.status(200).json(
                {
                    success: true,
                    message: "Messages retrieved successfully",
                    data: messages
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Messages cant be retrieved",
            error: error
        })
    }
}
