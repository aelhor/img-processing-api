"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imgController_1 = __importDefault(require("../controller/imgController"));
const imgRouter = express_1.default.Router();
console.log();
imgRouter.get('/', imgController_1.default);
exports.default = imgRouter;
