const AWS = require('aws-sdk');
const asyncBusboy = require('async-busboy');
const util = require('util');
const fs = require('fs');
const uploadFile = require('../middlewares/uploadFile');


let controller = {


    /**
     * @swagger
     * 
     * /pictures/:
     *   post:
     *     summary: create Picture
     *     operationId: createPicture
     *     tags: 
     *       - books
     *     security:
     *      - basicAuth
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *          schema: 
     *           type: object 
     *           properties: 
     *            image: 
     *             type: string
     *             format: binary
     *     responses:
     *       '201':
     *         description: Book created
     *       '400':
     *         description: Invalid request
     *       '401':
     *         description: Unauthorized
     * 
     */

    uploadPicture: async (ctx, next) => {
        console.log("Picture");
        //const f = ctx.request.upload;
        console.log(ctx.request.files);
       
       
        try {
           console.log(ctx.request.files);
            const file = ctx.request.files.image;
            const { key, Location } = await uploadFile({
                fileName: file.name,
                filePath: file.path,
                fileType: file.type,
            });
            ctx.body = { key, Location };
           
 
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },
}

module.exports = controller;