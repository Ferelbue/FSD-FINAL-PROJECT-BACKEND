import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { Roles1713610169289 } from "./migrations/1713610169289-roles"
import { Role } from "../models/Role"
import { Users1713610285564 } from "./migrations/1713610285564-users"
import { User } from "../models/User"
import { Categories1713610665709 } from "./migrations/1713610665709-categories"
import { Category } from "../models/Category"
import { Products1713611005530 } from "./migrations/1713611005530-products"
import { Product } from "../models/Product"
import { Deals1713611339193 } from "./migrations/1713611339193-deals"
import { Deal } from "../models/Deal"
import { FavoriteProducts1713611479717 } from "./migrations/1713611479717-favoriteProducts"
import { FavoriteProduct } from "../models/FavoriteProduct"
import { Messages1713611636636 } from "./migrations/1713611636636-messages"
import { Message } from "../models/Message"
import { Reviews1713611748816 } from "./migrations/1713611748816-reviews"
import { Review } from "../models/Review"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3309,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "test",
    entities: [
        Role,
        User,
        Category,
        Product,
        Deal,
        FavoriteProduct,
        Message,
        Review
    ],
    migrations: [
        Roles1713610169289,
        Users1713610285564,
        Categories1713610665709,
        Products1713611005530,
        Deals1713611339193,
        FavoriteProducts1713611479717,
        Messages1713611636636,
        Reviews1713611748816
    ],
    synchronize: false,
    logging: false,
})
