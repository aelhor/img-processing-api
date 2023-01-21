"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (img, width, height) => {
    // console.log("typeof width : ",typeof width, width, typeof height, height)
    if (isNaN(width) || isNaN(height)) {
        throw new Error('width and height should be numbers');
    }
    if (width <= 0 || height <= 0) {
        throw new Error('width and height should be positive numbers and greater then 0');
    }
    if (!(img instanceof Buffer)) {
        throw new Error('img should be a buffer');
    }
    const imageResized = (0, sharp_1.default)(img).resize({
        width: +width,
        height: +height,
    });
    return imageResized;
};
module.exports = resizeImage;
