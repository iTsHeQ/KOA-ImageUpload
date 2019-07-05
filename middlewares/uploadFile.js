const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {

    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        
    });
 
    const s3 = new aws.S3({
        apiVersion: '2006-03-01',
        region: 'us-east-2',
    });
 
    const params = {
        Bucket: 'bookbucketapi',
        Body: fs.createReadStream(filePath),
        Key: "folder/"+Date.now()+"_"+fileName,
    };
 
    return s3.upload(params).promise();
    
    

};

module.exports =  uploadFile ;