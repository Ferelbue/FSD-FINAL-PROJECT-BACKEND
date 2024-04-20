
import "dotenv/config"; //archivo con las variables de entorno
import { app } from "./app";
import { AppDataSource } from "./database/db";

//Si existe un puerto en el archivo .env lo usa. Si no usa el 4001
const PORT = process.env.PORT || 4001;

const startServer = () => {
    
    AppDataSource.initialize()
        .then(() => {
            console.log('------------------------');
            console.log('-- DATABASE CONNECTED --');

            app.listen(PORT, () => {

                console.log('------------------------');
                console.log('---- SERVER RUNNING ----');
                console.log(`----    PORT:${PORT}   ----`);
                console.log('------------------------');
            })
        })
        .catch(error => {
            console.log(error)
        })
}

startServer();