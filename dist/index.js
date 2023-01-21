"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const imgRoutes_1 = __importDefault(require("./routes/imgRoutes"));
// routes
app.get('/api', (req, res) => {
    res.send('Hello');
});
app.use('/api/images', imgRoutes_1.default);
const port = 3000;
app.listen(port, () => console.log('server on ' + port));
exports.default = app;
