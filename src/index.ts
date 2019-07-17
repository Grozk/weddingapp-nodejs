import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import {registerAPI} from "./routes/api";
import {registerIndex} from "./routes/index";

// initialize configuration
dotenv.config();

createConnection().then(async (connection) => {
    // port is now available to the Node.js runtime from .env file (dotenv dependency)
    const port = process.env.SERVER_PORT;

    const app = express();

    // Configure Express to parse incoming JSON data
    app.use(express.json());

    // Configure Express to use EJS
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    // Configure Express to serve static files in the public folder
    app.use(express.static(path.join(__dirname, "public")));

    // Configure routes
    // routes.registerIndex(app);
    registerIndex(app);
    registerAPI(app);

    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });

// tslint:disable-next-line: no-console
}).catch((error) => console.log("TypeORM connection error: ", error));
