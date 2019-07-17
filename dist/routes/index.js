"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as api from "./api";
exports.registerIndex = (app) => {
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        res.render("index");
    });
    // define a secure route handler for the guitars page
    app.get("/messages", (req, res) => {
        res.render("messages");
    });
    // enregistrement de la partie back-end
    // api.registerAPI( app );
};
//# sourceMappingURL=index.js.map