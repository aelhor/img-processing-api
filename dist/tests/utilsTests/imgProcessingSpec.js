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
const imagesProcessing_1 = __importDefault(require("../../utils/imagesProcessing"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
describe('resizeImage', () => {
    const testImgPath = path_1.default.join(__dirname, 'test.jpg');
    const testImg = fs_1.default.readFileSync(testImgPath);
    console.log(__dirname);
    it('should resize the image to the specified width and height', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = 300;
        const height = 200;
        const resizedImage = (0, imagesProcessing_1.default)(testImg, width, height);
        const imageResizedBuffer = yield resizedImage.toBuffer();
        const { width: w, height: h } = yield (0, sharp_1.default)(imageResizedBuffer).metadata();
        expect(w).toEqual(width);
        expect(h).toEqual(height);
        // Check that the resized image is a valid image buffer
        expect(Buffer.isBuffer(imageResizedBuffer)).toBe(true);
    }));
    it('should return an error if the provided width or height is negative or 0', () => {
        expect(() => (0, imagesProcessing_1.default)(testImg, -300, 200)).toThrowError('width and height should be positive numbers and greater then 0');
        expect(() => (0, imagesProcessing_1.default)(testImg, 300, 0)).toThrowError('width and height should be positive numbers and greater then 0');
    });
});
