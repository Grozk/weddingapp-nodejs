"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const utilsID = __importStar(require("../utils/generate_ID"));
exports.register = (app) => {
    const port = parseInt(process.env.PGPORT || "5432", 10);
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };
    const pgp = pg_promise_1.default();
    const db = pgp(config);
    // get all the messages link to a wedding
    app.get(`/api/messages/all`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const weddingId = req.query.weddingId;
            const messages = yield db.any(`
                SELECT
                    message_id
                    , wedding_id
                    , message
                    , number_sender
                    , name_sender
                    , message_sent
                FROM    message
                WHERE   wedding_id = $[weddingId]`, { weddingId });
            return res.json(messages);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/wedding/find/:search`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const weddingId = req.userContext.weddinginfo.sub;
            const wedding = yield db.any(`
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
            return res.json(wedding);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.post(`/api/wedding/add`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const publicID = utilsID.makeid(5);
            // const weddingId = req.userContext.weddinginfo.sub;
            const returnPublicID = yield db.one(`
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
                RETURNING id_public;`, Object.assign({ publicID }, req.body));
            return res.json({ returnPublicID });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.post(`/api/messages/add`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const weddingId = req.userContext.weddinginfo.sub;
            const id = yield db.one(`
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
                RETURNING id_public;`, Object.assign({ weddingId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
};
//# sourceMappingURL=api.js.map