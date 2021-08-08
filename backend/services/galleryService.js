const request = require('superagent');

// tried a different way of exporting methods since there was only one.
module.exports = {
    async getPictures() {
        try {
            let images = [];
            let imageList = (await request.get(`https://dog.ceo/api/breeds/image/random/6`)).body.message;
            imageList.map(il => {
                let image = {};
                image.message = il;
                image.breed = il.split('/')[4];
                images.push(image);
            });
            return {images};
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}