const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {
    
    return new Promise((resolve, reject) => {
        const s3 = new aws.S3({
            apiVersion: '2006-03-01',
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-2'
        });

        const fileStream = fs.createReadStream(filePath);
        fileStream
                .on('error', function (err) {
            console.log('File Error', err);
        });
        s3.upload({
            ACL: "public-read",
            // You'll input your bucket name here
            Bucket: "bookbucketapi",
            Body: fileStream,
            Key: fileName,
            ContentType: fileType,
        }, {
                function(err, data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else if (data) {
                        resolve({ key: data.Key, url: data.Location });
                    }
                }
            }
        );

    });

};

module.exports =  uploadFile ;