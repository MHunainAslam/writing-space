const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.post("/api", (req, res) => {

    res.send("200");
});
const getRandom = () => {
    let date = new Date();
    let ms = date.getTime();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let rand = Math.floor(Math.random() * new Date().getTime());
    return `${rand}${day}${month}${year}${ms}`;
}

const cors = require('cors');
app.use(cors()); // if you want to use every domain

const corsOption = {
    origin: ['*'],
};
app.use(cors(corsOption));

// Upload Endpoint
app.post('/upload', (req, res) => {


    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    var filesPaths = [];

    var len = 0;

    console.log(file.name, req.files);

    if (file.name) {
        let rand = getRandom();
        file.mv(`${__dirname}/public/uploads/${rand}${file.name}`, err => {
            if (err) {
                return res.status(500).send(err);
            }

            filesPaths.push(`/uploads/${rand}${file.name}`)
            res.status(200).json({ filePath: filesPaths });

        });
    }
    // res.send(file)
    else {
        file.forEach(item => {
            let rand = getRandom();

            item.mv(`${__dirname}/public/uploads/${rand}${item.name}`, err => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (len != file.length - 1) {
                    filesPaths.push(`/uploads/${rand}${item.name}`)
                    len++;
                }
                else {
                    filesPaths.push(`/uploads/${rand}${item.name}`)
                    res.status(200).json({ filePath: filesPaths });
                    len = 0;
                    filesPaths = [];
                }
            });
        });
    }

});
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(65332, () => console.log('Server Started...'));

