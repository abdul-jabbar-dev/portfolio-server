const express = require('express')
const app = express()
const cors = require('cors');
const { ObjectID } = require('mongodb')
const mongodb = require('mongodb')
require('dotenv').config();
const multer = require('multer')
var bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2
const upload = multer({ dest: 'temp/' })
const port = process.env.PORT || 2001;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'/temp')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
    
})

///configer my cloudinary
cloudinary.config({
    cloud_name: 'dnkwv76h3',
    api_key: '326797376699676',
    api_secret: 'U2OcTLd7F1q90fBh93r4WgbgjEQ'
});

const uri = "mongodb+srv://devAbdulPortfolio:1532002@cluster0.pdnb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('portfolio');
        const projectsCollection = database.collection('projects');
        //projects collection
        app.post('/projects', async (req, res) => {
            let targetFile = req.body;
            console.log('file:', targetFile)
            console.log('files:', req)

            //mv(path, CB function(err))
            // targetFile.mv(path.join(__dirname, 'uploads', targetFile.name), (err) => {
            //     if (err)
            //         return res.status(500).send(err);
            //     res.send('File uploaded!');
            // });
            // cloudinary.uploader.upload(files.siteThumbnail.tempFilePath,
            //     { public_id: "imageBB" },
            //     (err, Res) => {
            //         console.log("res:", Res)
            //         console.log("err:", err)
            // res.send(res)
            //     });

            // const result = await projectsCollection.insertOne(projects);
        });

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Worlds')
})

app.listen(port, () => {
    console.log(port, 'is running');
})