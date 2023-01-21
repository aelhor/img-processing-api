import app from '../../index';
import supertest from 'supertest';
import sharp from 'sharp';

const request = supertest(app);

describe('img controller', () => {
    it('should return the resized image', async () => {
        // Create a test image and save it in the images directory
        // ...

        // Send a GET request to the imgController API

        const response = await request.get('/api/images').query({ filename: '1', width: 300, height: 200 });
        expect(response.status).toBe(200);

        // Check that the response is a valid image buffer
        expect(Buffer.isBuffer(response.body)).toBe(true);

        // Check that the width and height of the resized image match the expected values
        const metadata = await sharp(response.body).metadata();
        expect(metadata.width).toEqual(300);
        expect(metadata.height).toEqual(200);
    });

    it('should return a 400 error if the any parameters is not provided', async () => {
        // Send a GET request to the imgController API without providing the filename
        const response = await request.get('/api/images').query({ width: 300, height: 200 });

        // Check that the response status is 400
        expect(response.status).toBe(400);

        // Check that the response body contains an error message
        expect(response.body.message).toBe('Invalid parameters. filename, width, and height should be strings and valid numbers');
    });

    it('should return a 400 error if the width and height values are not valid', async () => {
        // Send a GET request to the imgController API without providing the filename
        const response = await request.get('/api/images').query({ filename: '2', width: 'w', height: 'h' });

        // Check that the response status is 400
        expect(response.status).toBe(400);

        // Check that the response body contains an error message
        expect(response.body.message).toBe('Invalid parameters. filename, width, and height should be strings and valid numbers');
    });

    it('should return a 500 error if the file can not be read ', async () => {
        // Send a GET request to the imgController API without providing the filename
        const response = await request.get('/api/images').query({ filename: 'badImage', width: 300, height: 200 });

        // Check that the response status is 500
        expect(response.status).toBe(500);

        // Check that the response body contains an error message
        expect(response.body.message).toBe('Error reading file from images directory');
    });
});
