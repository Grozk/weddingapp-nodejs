import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime from .env file (dotenv dependency)
const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );

// Configure routes
routes.register( app );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
