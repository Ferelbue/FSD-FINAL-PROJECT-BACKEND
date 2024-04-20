import { categorySeedDatabase } from "./categorySeeds";
import { roleSeedDatabase } from "./roleSeeds";
import { userSeedDatabase } from "./userSeeds";

const seeder = async () => {
    try {
        // await roleSeedDatabase();
        // await userSeedDatabase();
        await categorySeedDatabase();
    } catch (error) {
        console.error('Error en la ejecución del seeder:', error);
    }
}

seeder();










