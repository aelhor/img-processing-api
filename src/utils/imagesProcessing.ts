import sharp from 'sharp'

const resizeImage  = (img:Buffer, width :number, height : number):sharp.Sharp=>{
    // console.log("typeof width : ",typeof width, width, typeof height, height)
    if (isNaN(width) || isNaN(height)) {
        throw new Error('width and height should be numbers');
    }
    if(width <= 0 || height <= 0){
        throw new Error('width and height should be positive numbers and greater then 0');
    }
    if (!(img instanceof Buffer)) {
        throw new Error('img should be a buffer');
    }
    const imageResized = sharp(img).resize({
        width: +width,
        height: +height
    });
    return imageResized
}

export = resizeImage