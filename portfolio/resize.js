const sharp = require('sharp');

const path = './public/img/icons/';
sharp(path)
.resize({ width: 100 })
.toBuffer()
