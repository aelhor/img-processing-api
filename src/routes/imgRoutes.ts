import express from 'express';
import imgController from '../controller/imgController';
const imgRouter = express.Router()

console.log()

imgRouter.get('/',imgController )

export default imgRouter