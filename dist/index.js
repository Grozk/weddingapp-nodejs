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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const api_1 = require("./routes/api");
const index_1 = require("./routes/index");
// initialize configuration
dotenv_1.default.config();
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    // port is now available to the Node.js runtime from .env file (dotenv dependency)
    const port = process.env.SERVER_PORT;
    const app = express_1.default();
    // Configure Express to parse incoming JSON data
    app.use(express_1.default.json());
    // Configure Express to use EJS
    app.set("views", path_1.default.join(__dirname, "views"));
    app.set("view engine", "ejs");
    // Configure Express to serve static files in the public folder
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    // Configure routes
    // routes.registerIndex(app);
    index_1.registerIndex(app);
    api_1.registerAPI(app);
    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });
    // tslint:disable-next-line: no-console
})).catch((error) => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map