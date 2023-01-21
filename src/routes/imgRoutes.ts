import express from 'express';
import imgController from '../controller/imgController';
const imgRouter = express.Router();

imgRouter.get('/', imgController);

export default imgRouter;
