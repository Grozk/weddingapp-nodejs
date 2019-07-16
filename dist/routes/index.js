"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app) => {
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        res.render("index");
    });
    // define a secure route handler for the guitars page
    app.get("/guitars", (req, res) => {
        res.render("guitars");
    });
};
//# sourceMappingURL=index.js.map