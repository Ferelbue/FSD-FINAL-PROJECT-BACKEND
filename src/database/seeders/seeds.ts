import { categorySeedDatabase } from "./categorySeeds";
import { dealSeedDatabase } from "./dealSeeds";
import { favoriteProductSeedDatabase } from "./favoriteProductSeeds";
import { messageSeedDatabase } from "./messageSeeds";
import { productSeedDatabase } from "./productSeeds";
import { reviewSeedDatabase } from "./reviewSeeds";
import { roleSeedDatabase } from "./roleSeeds";
import { userSeedDatabase } from "./userSeeds";

const seeder = async () => {
    try {
        // await roleSeedDatabase();
        // await userSeedDatabase();
        // await categorySeedDatabase();
        await productSeedDatabase();
        // await favoriteProductSeedDatabase();
        // await reviewSeedDatabase();
        // await messageSeedDatabase();
        // await dealSeedDatabase();

    } catch (error) {
        console.error('Error en la ejecución del seeder:', error);
    }
}

seeder();










