import { Request, Response } from "express"
import { Product } from "../models/Product"
import { Deal } from "../models/Deal"

// CREATE DEAL
export const approveDeal = async (req: Request, res: Response) => {

    try {
        const productId = req.params.productId;
        const userLogedId = req.tokenData.userId;

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
        console.log(product)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        console.log(product.owner.id, userLogedId)
        if (product.owner.id === userLogedId) {
            const deal = await Deal.find({
                where: {
                    product: { id: parseInt(productId) },
                    userOwner: { id: userLogedId }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                }
            })
            console.log(deal)

            // Actualizar datos
            const dealUpdated = await Deal.update(
                {
                    id: deal[0].id
                },
                {
                    userOwner_confirm: true
                }
            )
            if (dealUpdated.affected === 1) {
                return res.status(200).json({
                    success: true,
                    message: "Deal approved"
                })
            }
        }else if (product.owner.id !== userLogedId) {
            const deal = await Deal.find({
                where: {
                    product: { id: parseInt(productId) },
                    userUser: { id: userLogedId }
                },
                relations: {
                    userOwner: true,
                    userUser: true
                }
            })
            console.log(deal)
            // Actualizar datos
            const dealUpdated = await Deal.update(
                {
                    id: deal[0].id
                },
                {
                    userUser_confirm: true
                }
            )
            if (dealUpdated.affected === 1) {
                return res.status(200).json({
                    success: true,
                    message: "Deal approved"
                })
            }
        }

        // if (product.owner.id !== userLogedId) {
        //     const deal = await Deal.find({
        //         where: {
        //             product: { id: parseInt(productId) },
        //             user: { id: parseInt(userId) }
        //         },
        //         relations: {
        //             userOwner: true,
        //             userUser: true
        //         }
        //     })
        //     console.log(deal)
        //     // Actualizar datos
        //     const dealUpdated = await Deal.update(
        //         {
        //             id: deal[0].id
        //         },
        //         {
        //             userUser_confirm: true
        //         }
        //     )
        //     if (dealUpdated.affected === 1) {
        //         return res.status(200).json({
        //             success: true,
        //             message: "Deal approved"
        //         })
        //     }
        // }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Deal cant be retrieved",
            error: error
        })
    }

}