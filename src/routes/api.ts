import * as express from "express";
import pgPromise from "pg-promise";
import * as utilsID from "../utils/generate_ID";

export const register = ( app: express.Application ) => {
    const port = parseInt( process.env.PGPORT || "5432", 10 );
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };

    const pgp = pgPromise();
    const db = pgp( config );

    // get all the messages link to a wedding
    app.get( `/api/messages/all`, async ( req: any, res ) => {
        try {
            const weddingId = req.query.weddingId;
            const messages = await db.any( `
                SELECT
                    message_id
                    , wedding_id
                    , message
                    , number_sender
                    , name_sender
                    , message_sent
                FROM    message
                WHERE   wedding_id = $[weddingId]`, { weddingId });
            return res.json( messages );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get( `/api/wedding/find/:search`, async ( req: any, res ) => {
        try {
            const weddingId = req.userContext.weddinginfo.sub;
            const wedding = await db.any( `
                SELECT
                wedding_id
                    , partner1
                    , partner2
                    , number1
                    , number2
                    , wedding_date
                    , id_public
                    , mail_creator
                FROM    wedding
                WHERE   id_public = $[weddingId]`, { weddingId });
            return res.json( wedding );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.post( `/api/wedding/add`, async ( req: any, res ) => {
        try {
            const publicID = utilsID.makeid(5);
            // const weddingId = req.userContext.weddinginfo.sub;
            const returnPublicID = await db.one( `
                INSERT INTO wedding( partner1
                    , partner2
                    , number1
                    , number2
                    , wedding_date
                    , id_public
                    , mail_creator )
                VALUES( $[partner1]
                    , $[partner2]
                    , $[number1]
                    , $[number2]
                    , $[wedding_date]
                    , $[publicID]
                    , $[mail_creator] )
                RETURNING id_public;`, { publicID, ...req.body  } );
            return res.json( { returnPublicID } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.post( `/api/messages/add`, async ( req: any, res ) => {
        try {
            const weddingId = req.userContext.weddinginfo.sub;
            const id = await db.one( `
                INSERT INTO messages( wedding_id
                    , message
                    , number_sender
                    , name_sender
                    , message_sent )
                VALUES( $[weddingId]
                    , $[message]
                    , $[number_sender]
                    , $[name_sender]
                    , $[message_sent] )
                RETURNING id_public;`, { weddingId, ...req.body  } );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );
};
