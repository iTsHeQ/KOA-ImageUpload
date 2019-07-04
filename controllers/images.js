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
     *         image/png:
     *           schema:
     *            type: string
     *            format: binary
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
        const f = ctx.request.upload;
       
       
        try {
            const {file, fields} = await asyncBusboy(ctx.req);
           
            const { key, url } = await uploadFile({
                fileName: file.name,
                filePath: file.path,
                fileType: file.type,
            });
            ctx.body = { key, url };
 
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },
}

module.exports = controller;