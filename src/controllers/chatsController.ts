import { Request, Response } from "express"
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
        const messages = await Message.find(
            {
                where: {
                    userOwner: { id: userId }
                },
                relations: {
                    userOwner: true,
                    userUser: true,
                    product: true
                },
                select: {
                    message: true,
                    userOwner: { id: true },
                    userUser: { id: true },
                    product: { id: true },
                    userOwner_notification: true,
                    userUser_notification: true,
                    updated_at: true
                }
            }
        )
        const messages2 = await Message.find(
            {
                where: {
                    userUser: { id: userId }
                },
                relations: {
                    userUser: true,
                    userOwner: true,
                    product: true
                },
                select: {
                    message: true,
                    userUser: { id: true },
                    userOwner: { id: true },
                    product: { id: true },
                    userUser_notification: true,
                    userOwner_notification: true,
                    updated_at: true
                }
            }
        )
        let arrayChats = [];
        for (let i = 0; i < messages.length; i++) {
            arrayChats.push(messages[i])
        }
        for (let i = 0; i < messages2.length; i++) {
            arrayChats.push(messages2[i])
        }


        let groupedChats = arrayChats.reduce((grouped: { [key: number]: typeof arrayChats }, message) => {
            if (message.product && message.userUser.id === userId) {
                let key = message.product.id;
                if (key) {
                    if (!grouped[key]) {
                        grouped[key] = [];
                    }
                    grouped[key].push(message);
                }
            }
            return grouped;
        }, {} as { [key: number]: typeof arrayChats });

        let groupedChats2 = arrayChats.reduce((grouped: { [key: string]: typeof arrayChats }, message) => {
            if (message.product && message.userOwner.id === userId) {
                let key = `productId=${message.product.id}-userUserId=${message.userUser.id}`;
                if (key) {
                    if (!grouped[key]) {
                        grouped[key] = [];
                    }
                    grouped[key].push(message);
                }
            }
            return grouped;
        }, {} as { [key: number]: typeof arrayChats });


        res.status(200).json(
            {
                success: true,
                message: "Products retrieved successfully",
                data: groupedChats, groupedChats2
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
                    select: {
                        message: true,
                        userOwner_author: true,
                        userUser_author: true,
                        updated_at: true
                    }
                }
            )
            return res.status(200).json(
                {
                    success: true,
                    message: "asdMessages retrieved successfully",
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
                    select: {
                        message: true,
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