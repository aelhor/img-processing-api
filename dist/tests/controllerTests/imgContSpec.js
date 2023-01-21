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
const index_1 = __importDefault(require("../../index"));
const supertest_1 = __importDefault(require("supertest"));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(index_1.default);
describe('img controller', () => {
    it('should return the resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a test image and save it in the images directory
        // ...
        // Send a GET request to the imgController API
        const response = yield request.get('/api/images').query({ filename: '1', width: 300, height: 200 });
        expect(response.status).toBe(200);
        // Check that the response is a valid image buffer
        expect(Buffer.isBuffer(response.body)).toBe(true);
        // Check that the width and height of the resized image match the expected values
        const metadata = yield (0, sharp_1.default)(response.body).metadata();
        expect(metadata.width).toEqual(300);
        expect(metadata.height).toEqual(200);
    }));
    it('should return a 400 error if the any parameters is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Send a GET request to the imgController API without providing the filename
        const response = yield request.get('/api/images').query({ width: 300, height: 200 });
        // Check that the response status is 400
        expect(response.status).toBe(400);
        // Check that the response body contains an error message
        expect(response.body.message).toBe('Invalid parameters. filename, width, and height should be strings and valid numbers');
    }));
    it('should return a 400 error if the width and height values are not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        // Send a GET request to the imgController API without providing the filename
        const response = yield request.get('/api/images').query({ filename: '2', width: 'w', height: 'h' });
        // Check that the response status is 400
        expect(response.status).toBe(400);
        // Check that the response body contains an error message
        expect(response.body.message).toBe('Invalid parameters. filename, width, and height should be strings and valid numbers');
    }));
    it('should return a 500 error if the file can not be read ', () => __awaiter(void 0, void 0, void 0, function* () {
        // Send a GET request to the imgController API without providing the filename
        const response = yield request.get('/api/images').query({ filename: 'badImage', width: 300, height: 200 });
        // Check that the response status is 500
        expect(response.status).toBe(500);
        // Check that the response body contains an error message
        expect(response.body.message).toBe('Error reading file from images directory');
    }));
});
