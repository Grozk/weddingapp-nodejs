import * as express from "express";
// import * as api from "./api";

export const registerIndex = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // define a secure route handler for the guitars page
    app.get( "/messages", ( req: any, res ) => {
        res.render( "messages" );
    } );

    // enregistrement de la partie back-end
    // api.registerAPI( app );
};
