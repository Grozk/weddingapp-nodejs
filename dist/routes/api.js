"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const message_1 = require("../entities/message");
const wedding_1 = require("../entities/wedding");
const utilsID = __importStar(require("../utils/generate_ID"));
exports.registerAPI = (app) => {
    app.post("/api/wedding", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const wed = yield typeorm_1.getConnection().getRepository(wedding_1.Wedding).create(req.body);
        // creation de l'ID public
        wed[0].idPublic = utilsID.makeid(5);
        const results = yield typeorm_1.getConnection().getRepository(wedding_1.Wedding).save(wed[0]);
        return res.send(results);
    }));
    app.get("/api/messages/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const wed = new wedding_1.Wedding();
        wed.weddingId = req.query.weddingId;
        const mess = new message_1.Message();
        mess.wedding = wed;
        const messages = yield typeorm_1.getConnection().getRepository(message_1.Message).find(mess);
        res.json(messages);
    }));
};
//# sourceMappingURL=api.js.map