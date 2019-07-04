const images = require('../controllers/images');

module.exports = (router) => {
    router.post('/pictures', images.uploadPicture);
}