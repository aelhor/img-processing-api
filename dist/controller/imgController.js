"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const imagesProcessing_1 = __importDefault(require("../utils/imagesProcessing"));
const imgController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename = '', height = '', width = '' } = req.query;
    //Validate the parameters passed
    if (!filename || typeof filename !== 'string' || !height || isNaN(+height) || !width || isNaN(+width)) {
        return res.status(400).send({
            message: 'Invalid parameters. filename, width, and height should be strings and valid numbers',
        });
    }
    const imgPath = path_1.default.join(__dirname, '../../assets/images', filename + '.jpg');
    const thumbsPath = path_1.default.join(__dirname, '../../assets/thumbs', width + '_' + height + '_' + filename + '.jpg');
    try {
        yield fs_1.promises.access(imgPath, fs_1.constants.F_OK);
        // redd file from images directory
        const img = yield fs_1.promises.readFile(imgPath);
        try {
            //image already exist in thumbs folder
            yield fs_1.promises.access(thumbsPath, fs_1.constants.F_OK);
            // read file from thumbs directory
            const existingimg = yield fs_1.promises.readFile(thumbsPath);
            res.set('Content-Type', 'image/jpeg');
            return res.status(200).send(existingimg);
        }
        catch (error) {
            //   image not found in thumbs folder
            const resized = (0, imagesProcessing_1.default)(img, width, height);
            const imageResizedBuffer = yield resized.toBuffer();
            // add the resized img to thumbs directory
            try {
                yield fs_1.promises.writeFile(thumbsPath, imageResizedBuffer);
            }
            catch (err) {
                console.log('Error while saving the image to the thumb folder', err);
                return res.status(500).send({
                    message: 'Error while saving the image to the thumb folder',
                });
            }
            res.set('Content-Type', 'image/jpeg');
            return res.status(200).send(imageResizedBuffer);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error reading file from images directory',
        });
    }
});
exports.default = imgController;
