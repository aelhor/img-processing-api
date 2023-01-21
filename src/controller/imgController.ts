import { Request, Response } from 'express';
import { promises as fs, constants } from 'fs';
import path from 'path';
import resizeImage from '../utils/imagesProcessing';

const imgController = async (req: Request, res: Response): Promise<Response> => {
    const { filename = '', height = '', width = '' } = req.query;

    //Validate the parameters passed
    if (!filename || typeof filename !== 'string' || !height || isNaN(+height) || !width || isNaN(+width)) {
        return res.status(400).send({
            message: 'Invalid parameters. filename, width, and height should be strings and valid numbers',
        });
    }

    const imgPath = path.join(__dirname, '../../assets/images', filename + '.jpg');
    const thumbsPath = path.join(__dirname, '../../assets/thumbs', width + '_' + height + '_' + filename + '.jpg');

    try {
        await fs.access(imgPath, constants.F_OK);

        // redd file from images directory
        const img = await fs.readFile(imgPath);
        try {
            //image already exist in thumbs folder
            await fs.access(thumbsPath, constants.F_OK);
            // read file from thumbs directory
            const existingimg = await fs.readFile(thumbsPath);
            res.set('Content-Type', 'image/jpeg');
            return res.status(200).send(existingimg);
        } catch (error) {
            //   image not found in thumbs folder
            const resized = resizeImage(img, width as unknown as number, height as unknown as number);
            const imageResizedBuffer = await resized.toBuffer();
            
            // add the resized img to thumbs directory
            try {
                await fs.writeFile(thumbsPath, imageResizedBuffer);
            } catch (err) {
                console.log('Error while saving the image to the thumb folder', err);
                return res.status(500).send({
                    message: 'Error while saving the image to the thumb folder',
                });
            }

            res.set('Content-Type', 'image/jpeg');
            return res.status(200).send(imageResizedBuffer);
        }
    } catch (error: unknown) {
        console.log(error);

        return res.status(500).send({
            message: 'Error reading file from images directory',
        });
    }
};

export default imgController;
