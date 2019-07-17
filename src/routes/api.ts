import * as express from "express";
import { getConnection } from "typeorm";
import { Message } from "../entities/message";
import { Wedding } from "../entities/wedding";
import * as utilsID from "../utils/generate_ID";

export const registerAPI = ( app: express.Application ) => {

        app.post("/api/wedding", async (req: any, res) => {
            const wed = await getConnection().getRepository(Wedding).create(req.body);
            // creation de l'ID public
            wed[0].idPublic = utilsID.makeid(5);

            const results = await getConnection().getRepository(Wedding).save(wed[0]);
            return res.send(results);
        });

        app.get("/api/messages/all", async (req: any, res) => {
            const wed = new Wedding();
            wed.weddingId = req.query.weddingId;
            const mess = new Message();
            mess.wedding = wed;

            const messages = await getConnection().getRepository(Message).find(mess);
            res.json(messages);
        });
};
