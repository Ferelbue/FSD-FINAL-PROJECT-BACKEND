
import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./database/db";

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