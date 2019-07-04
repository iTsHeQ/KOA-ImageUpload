const AWS = require('aws-sdk');
const asyncBusboy = require('async-busboy');
const util = require('util');
const fs = require('fs');


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

        try {
            const {files, fields} = await asyncBusboy(ctx.req);
            console.log(files);
            console.log(fields);
            if(checkFiles(fields)){
                files.map(files)
            }else {
                return 'error';
            }
            console.log(stream);
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },
}

module.exports = controller;