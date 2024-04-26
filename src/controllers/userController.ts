import { Request, Response } from "express"
import { User } from "../models/User"
import { FindOperator, Like } from "typeorm"
import bcrypt from "bcrypt";
import { error } from "console";


//GET USER PROFILE
export const getUserProfile = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const userId = req.tokenData.userId

        //CONSULTA
        const user = await User.find(
            {
                where: {
                    id: userId
                },
                relations: [
                    'role',
                    'products',
                ],
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    image: true,
                    email: true,
                    products: {
                        id: true,
                        name: true
                    },
                    role: {
                        name: true,
                    }
                }
            }
        )

        // VALIDAR DATOS
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",

            })

        }
        // RESPUESTA
        res.status(200).json(
            {
                success: true,
                message: "User retrieved successfully",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error
        })
    }
}

//MODIFY USER PROFILE
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        //RECUPERAR DATOS
        let name = req.body.name
        let lastName = req.body.lastName
        let email = req.body.email
        let image = req.body.image
        let city = req.body.city
        const userId = req.tokenData.userId

        const user = await User.findOne(
            {
                where: {
                    id: userId
                },
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    passwordHash: true,
                    role: {
                        name: true,
                    }
                }
            }
        )

        //VALIDAR
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",

            })

        }

        if (!name && !lastName && !email && !city) {

            return res.status(400).json({
                succes: false,
                message: "Data can't be empty"
            })
        }

        if (!name) {
            name = user?.name
        }

        if (!lastName) {
            lastName = user?.lastName
        }

        if (!email) {
            email = user?.email
        }

        if (!city) {
            city = user?.city
        }

        if (name?.length > 50) {

            return res.status(400).json({
                succes: false,
                message: "First name too large"
            })
        }

        if (lastName?.length > 50) {

            return res.status(400).json({
                succes: false,
                message: "Last name too large"
            })
        }
        //validacion email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Email format invalid"
                }
            )
        }

        const exist = await User.findOne(
            {
                where: {
                    email: email,
                }
            }
        )

        // Actualizar datos en la BD
        const userUpdated = await User.update(
            {
                id: userId
            },
            {
                name: name,
                lastName: lastName,
                image: image,
                email: email,
                city: city,
            }
        )

        //Recuper los datos para mostrarlos en la respuesta
        const user2 = await User.findOne(
            {
                where: {
                    id: userId
                },
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    image: true,
                    email: true,
                    city: true,
                    role: {
                        name: true,
                    }
                }
            }
        )

        //Response
        return res.status(200).json(
            {
                success: true,
                message: "User updated succesfully",
                data: user2
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't update user",
            error: error
        })
    }
}

//GET USER PROFILE
export const getUsers = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        //RECUPERAR DATOS DE LA BUSQUEDA
        //Crear interface con el parametro de busqueda email que es de tipo FindOperator<string>
        interface queryFilters {
            email?: FindOperator<string>,
            firstName?: FindOperator<string>,
            lastName?: FindOperator<string>,
            is_active?: boolean,
        }
        // Se declara la constante queryFiters de tipo queryFilters
        const queryFilters: queryFilters = {}
        if (req.query.email) {
            queryFilters.email = Like("%" + req.query.email.toString() + "%");
        }
        if (req.query.firstName) {
            queryFilters.firstName = Like("%" + req.query.firstName.toString() + "%");
        }
        if (req.query.lastName) {
            queryFilters.lastName = Like("%" + req.query.lastName.toString() + "%");
        }
        queryFilters.is_active = true;
        //CONSULTA. Busqueda con los parametros de la query
        const user = await User.find(
            {
                where: queryFilters,
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    image: true,
                    city: true,
                    role: {
                        name: true,
                    }
                },
                take: limit,
                skip: skip
            }
        )
        // VALIDACION
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            })
        }
        // RESPUESTA
        res.status(200).json(
            {
                success: true,
                message: "Email retrieved successfully",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Email cant be retrieved",
            error: error
        })
    }
}

//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        // RECUPERAR DATOS
        const userId = req.params.id
        const userRole = req.tokenData.roleName
        const tokenUserId = req.tokenData.userId.toString()

        const user = await User.findOneBy({
            id: parseInt(userId)
        })


        // VALIDACION
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "USER NOT FOUND"
            })
        }


        if (userRole !== "user") {

            // ACTUALIZAR EN BD
            const userDeleted = await User.remove(user)

            // RESPONDER
            return res.status(200).json({
                success: true,
                message: "USER DELETED SUCCESSFULLY",
                data: userDeleted
            })
        } else if ((userId === tokenUserId)) {

            const userUpdated = await User.update(
                {
                    id: parseInt(tokenUserId)
                },
                {
                    is_active: false
                }
            )
            // RESPONDER
            return res.status(200).json({
                success: true,
                message: "USER DELETED SUCCESSFULLY",
                data: userUpdated
            })

        } else {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "USER CAN'T BE DELETED",
            error: error
        })
    }
}

//MODIFY USER ROLE
export const updateUserRole = async (req: Request, res: Response) => {
    try {
        //Recuperar parametros de la ruta
        const role = req.body.role
        const userId = req.params.id
        const userRole = req.tokenData.roleName
        let roleNumber = 0;

        // Validacion
        if (role != "user" && role != "admin" && role != "super-admin") {
            return res.status(400).json({
                succes: false,
                message: "Incorrect role"
            })
        }

        const user1 = await User.findOneBy({
            id: parseInt(userId)
        })
        // VALIDACION
        if (!user1) {
            return res.status(404).json({
                success: false,
                message: "USER NOT FOUND"
            })
        }


        if (userRole === "super-admin") {
            if (role === "user") {
                roleNumber = 1
            }
            if (role === "admin") {
                roleNumber = 2
            }
            if (role === "super-admin") {
                roleNumber = 3
            }

            // Actualizar datos
            const userUpdated = await User.update(
                {
                    id: parseInt(userId)
                },
                {
                    role: { id: roleNumber }
                }
            )

            //Recuper los datos para mostrarlos en la respuesta
            const user = await User.findOne(
                {
                    where: {
                        id: parseInt(userId)
                    },
                    relations: {
                        role: true
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        passwordHash: true,
                        role: {
                            name: true,
                        }
                    }
                }
            )

            //Response
            res.status(200).json(
                {
                    success: true,
                    message: "User role updated succesfully",
                    data: user
                })
        } else
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't create rol",
            error: error
        })
    }
}

export const getUserByID = async (req: Request, res: Response) => {

    try {
        //RECUPERAR DATOS
        const userId = req.params.id
        const roleName = req.tokenData.roleName
        const userRole = req.tokenData.roleName

        if (userRole === "super-admin") {

            const user = await User.findOne(
                {
                    where: {
                        id: parseInt(userId)
                    },
                    relations: [
                        'products',
                    ],
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        image: true,
                        email: true,
                        products: {
                            id: true,
                            name: true
                        },
                        role: {
                            name: true,
                        }
                    }

                }
            )

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    data: user

                })
            }

            //Response
            res.status(200).json(
                {
                    success: true,
                    message: "User retrieved succesfully",
                    data: user
                })
        } else
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED",
                data: error
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error
        })
    }

}

export const updateUserProfileById = async (req: Request, res: Response) => {
    try {
        //RECUPERAR DATOS
        let name = req.body.name
        let lastName = req.body.lastName
        let email = req.body.email
        let image = req.body.image
        let city = req.body.city
        const userId = parseInt(req.params.id)

        const user = await User.findOne(
            {
                where: {
                    id: userId
                },
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    passwordHash: true,
                    role: {
                        name: true,
                    }
                }
            }
        )

        //VALIDAR
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",

            })

        }

        if (!name && !lastName && !email && !city) {

            return res.status(400).json({
                succes: false,
                message: "Data can't be empty"
            })
        }

        if (!name) {
            name = user?.name
        }

        if (!city) {
            city = user?.city
        }

        if (!lastName) {
            lastName = user?.lastName
        }

        if (!email) {
            email = user?.email
        }

        if (name?.length > 50) {

            return res.status(400).json({
                succes: false,
                message: "First name too large"
            })
        }

        if (lastName?.length > 50) {

            return res.status(400).json({
                succes: false,
                message: "Last name too large"
            })
        }
        //validacion email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Email format invalid"
                }
            )
        }

        const exist = await User.findOne(
            {
                where: {
                    email: email,
                }
            }
        )

        // Actualizar datos en la
        const userUpdated = await User.update(
            {
                id: userId
            },
            {
                name: name,
                lastName: lastName,
                image: image,
                email: email,
                city: city,
            }
        )

        //Recuper los datos para mostrarlos en la respuesta
        const user2 = await User.findOne(
            {
                where: {
                    id: userId
                },
                relations: {
                    role: true,
                },
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    image: true,
                    city: true,
                    email: true,
                    role: {
                        name: true,
                    }
                }
            }
        )

        //Response
        return res.status(200).json(
            {
                success: true,
                message: "User updated succesfully",
                data: user2
            })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't update user",
            error: error
        })
    }
}