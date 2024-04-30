import { Request, Response } from "express"
import { Product } from "../models/Product"
import { Deal } from "../models/Deal"
import { Message } from "../models/Message";
import { Console } from "console";

// CREATE DEAL
export const approveDeal = async (req: Request, res: Response) => {

    try {
        const productId = req.params.productId;
        const userLogedId = req.tokenData.userId;
        const userId = req.params.userUserId;

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
        console.log(product.owner.id)
        console.log(userLogedId)
        console.log(userId)
        if (product.owner.id === userLogedId) {

            const message = await Message.find({
                where: {
                    product: { id: parseInt(productId) },
                    userOwner: { id: userLogedId },
                    userUser: { id: parseInt(userId) }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                },
                select: {
                    id: true,
                    userOwner: { id: true },
                    userUser: { id: true },
                    userUser_notification: true,
                    userOwner_notification: true
                }

            })
            console.log(message)
            const deal = await Deal.find({
                where: {
                    product: { id: parseInt(productId) },
                    userOwner: { id: userLogedId },
                    userUser: { id: parseInt(userId) }
                },
                relations: {
                    userOwner: true,
                    userUser: true,
                },
                select: {
                    id: true,
                    userOwner_confirm: true,
                    userUser_confirm: true
                }
            })

            if (deal[0].userOwner_confirm === true) {
                return res.status(400).json({
                    success: false,
                    message: "Deal already approved"
                })
            }

            // Actualizar datos
            const dealUpdated = await Deal.update(
                {
                    id: deal[0].id
                },
                {
                    userOwner_confirm: true
                }
            )

            const messageUpdated = await Message.update(
                {
                    id: message[0].id
                },
                {
                    userUser_notification: true
                }
            )

            const updated = await Message.find({
                where: {
                    id: message[0].id
                },
                select: {
                    userUser_notification: true
                }
            })

            if (dealUpdated.affected === 1) {
                return res.status(200).json({
                    success: true,
                    message: "Deal approved"
                })
            }
        } else if (product.owner.id !== userLogedId) {
            const message = await Message.find({
                where: {
                    product: { id: parseInt(productId) },
                    userUser: { id: userLogedId }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                },
                select: {
                    id: true,
                    userOwner: { id: true },
                    userUser: { id: true },
                    userUser_notification: true,
                    userOwner_notification: true
                }

            })

            const deal = await Deal.find({
                where: {
                    product: { id: parseInt(productId) },
                    userUser: { id: userLogedId }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                },
                select: {
                    id: true,
                    userOwner_confirm: true,
                    userUser_confirm: true
                }
            })

            if (deal[0].userUser_confirm === true) {
                return res.status(400).json({
                    success: false,
                    message: "Deal already approved"
                })
            }

            // Actualizar datos
            const dealUpdated = await Deal.update(
                {
                    id: deal[0].id
                },
                {
                    userUser_confirm: true
                }
            )

            const messageUpdated = await Message.update(
                {
                    id: message[0].id
                },
                {
                    userOwner_notification: true
                }
            )

            const updated = await Message.find({
                where: {
                    id: message[0].id
                },
                select: {
                    userUser_notification: true
                }
            })

            if (dealUpdated.affected === 1) {
                return res.status(200).json({
                    success: true,
                    message: "Deal approved"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Deal cant be retrieved",
            error: error
        })
    }

}

export const statusDeal = async (req: Request, res: Response) => {

    try {
        const productId = req.params.productId;
        const userLogedId = req.tokenData.userId;
        const userId = req.params.userUserId;


        const product = await Deal.find({
            where: {
                product: { id: parseInt(productId) },
                userOwner: { id: userLogedId },
                userUser: { id: parseInt(userId) }
            },
            relations: {
                userOwner: true,
                userUser: true
            },
            select: {
                id: true,
                userOwner_confirm: true,
                userUser_confirm: true
            }
        })

        console.log(product)
        if (product.length === 0) {

            const product2 = await Deal.find({
                where: {
                    product: { id: parseInt(productId) },
                    userUser: { id: userLogedId }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                },
                select: {
                    id: true,
                    userOwner_confirm: true,
                    userUser_confirm: true
                }
            })

            return res.status(200).json({
                success: true,
                message: "Deal status retrieved",
                data: product2
            })

        }

        return res.status(200).json({
            success: true,
            message: "Deal status retrieved",
            data: product
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Deal cant be retrieved",
            error: error
        })
    }
}

