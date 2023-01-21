import resizeImage from '../../utils/imagesProcessing';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';


describe('resizeImage', () => {
    const testImgPath = path.join(__dirname, 'test.jpg');
    const testImg = fs.readFileSync(testImgPath);
    console.log(__dirname);

    it('should resize the image to the specified width and height', async () => {
        const width = 300;
        const height = 200;
        const resizedImage = resizeImage(testImg, width, height);
        const imageResizedBuffer = await resizedImage.toBuffer();
        const { width: w, height: h } = await sharp(imageResizedBuffer).metadata();
        expect(w).toEqual(width);
        expect(h).toEqual(height);
        // Check that the resized image is a valid image buffer
        expect(Buffer.isBuffer(imageResizedBuffer)).toBe(true);
    });

    it('should return an error if the provided width or height is negative or 0', () => {
        expect(() => resizeImage(testImg, -300, 200)).toThrowError('width and height should be positive numbers and greater then 0');
        expect(() => resizeImage(testImg, 300, 0)).toThrowError('width and height should be positive numbers and greater then 0');
    });
});
