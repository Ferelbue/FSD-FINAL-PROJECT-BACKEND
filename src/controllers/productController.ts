import { Request, Response } from "express"
import { Product } from "../models/Product"
import { FindOperator, Like } from "typeorm";

//GET SERVICE
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

// //CREATE SERVICE
// export const createProduct = async (req: Request, res: Response) => {

//     try {
//         const serviceName = req.body.serviceName;
//         const description = req.body.description;
//         const image = req.body.image;

        
        
//         const newUser = await Service.create({
//             serviceName: serviceName,
//             description: description,
//             image:image,
//         }).save()
        
//         console.log(newUser)
//         res.status(201).json(
//             {
//                 success: false,
//                 message: "Service registered successfully"
//             }
//         )

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Service cant be created",
//             error: error
//         })
//     }
// }

// //MODIFY SERVICE
// export const updateProduct = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.id;
//         const serviceName = req.body.serviceName;
//         const description = req.body.description;
//         const image = req.body.image;

//         //Validar datos
//         const user = await Service.findOneBy(
//             {
//                 id: parseInt(userId)
//             }
//         )

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",

//             })

//         }

//         // Tratar datos



//         // Actualizar datos
//         const serviceUpdated = await Service.update(
//             {
//                 id: parseInt(userId)
//             },
//             {
//                 serviceName: serviceName,
//                 description: description,
//                 image: image
//             },

//         )

//         const servicePrint = await Service.findOneBy(
//             {
//                 id: parseInt(userId)
//             }
//         )


//         // Responder
//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Service updated successfully",
//                 data: servicePrint
//             }
//         )

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Service cant be update",
//             error: error
//         })
//     }
// }

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

// export const getProductByID = async (req: Request, res: Response) => {

//     try {
//         //RECUPERAR DATOS
//         const serviceId = req.params.id

//         //Consultar y recuperar de la DB
//         const service = await Service.findOne(
//             {
//                 where: {
//                     id: parseInt(serviceId)
//                 },
//                 select: {
//                     id: true,
//                     serviceName: true,
//                     description: true,
//                     image: true
//                 }
//             }
//         )

//         // VALIDAR
//         if (!service) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Service not found",

//             })
//         }


//         // RESPONDER
//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Service retrieved successfully",
//                 data: service
//             }
//         )
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "User cant be retrieved",
//             error: error
//         })
//     }

// }