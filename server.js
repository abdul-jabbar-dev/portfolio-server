const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 2001;
const mongodb = require('mongodb')
const fileUpload = require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use(fileUpload());


function base64_encode(file) {
    for (let key in file) {
        let bufData = file[key].data
        let buffer = Buffer.from(bufData, 'base64')
        file[key] = buffer
    }
    return file;
}
// ;

const uri = "mongodb+srv://devAbdulPortfolio:1532002@cluster0.pdnb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('portfolio');
        const projectsCollection = database.collection('projects');
        //projects collection
        app.post('/projects', async (req, res) => {
            let projects = req.body;
            let files = req.files;
            let image = base64_encode(files)
            for (let key in image) {
                projects[key] = image[key]
            }
            // let imageSting = image
            // let buffer = Buffer.from(imageSting, 'base64')
            // projects.siteThumbnail = buffer
            // const picData = image.siteThumbnail.data;
            // const encodedPic = picData.toString('base64');
            // const imageBuffer = Buffer.from(encodedPic, 'base64');
            // console.log(imageBuffer)
            // console.log(projects);
            // console.log('files', [files.files]);
            // console.log('files2', files2);
            const result = await projectsCollection.insertOne(projects);
            res.json(result)
        });
        app.get('/projects', async (req, res) => {
            // const { items } = req.query
            // let result;
            // if (items) {
            //     result = await projectsCollection.find().sort({ "postDate": -1 }).limit(parseInt(items)).toArray();
            // } else {
            let result = await projectsCollection.find({}).toArray();
            // }
            res.json(result)
        });
        // app.get('/products/:id', async (req, res) => {
        //     const { id } = req.params
        //     const quary = { _id: ObjectId(id) }
        //     const result = await productCollection.findOne(quary)
        //     res.send(result)
        // });
        // app.get('/cart/:id', async (req, res) => {
        //     const { id } = req.params
        //     const quary = { _id: ObjectId(id) }
        //     const result = await cartCollection.findOne(quary)
        //     res.send(result)
        // });
        // app.delete('/products/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const quare = { _id: ObjectId(id) }
        //     const result = await productCollection.deleteOne(quare)
        //     res.json(result)
        // })
        // //cart collection
        // app.get('/cart', async (req, res) => {
        //     const email = req.query.email;
        //     let result;
        //     if (email) {

        //         const query = cartCollection.find({ email: email }, { _id: 0 })
        //         result = await query.toArray()
        //     } else {
        //         result = await cartCollection.find({}).toArray()
        //     }
        //     res.json(result)
        // });
        // app.post('/cart', async (req, res) => {
        //     const data = req.body

        //     const result = await cartCollection.insertOne(data)
        //     res.send(result)
        // });
        // app.delete('/cart/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const quare = { _id: ObjectId(id) }
        //     const result = await cartCollection.deleteOne(quare)
        //     res.json(result)
        // })
        // app.put('/cart/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const user = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     if (user.paymentIntent) {
        //         const updateDoc = { $set: { orderState: 'paid' } };
        //         const result = await cartCollection.updateOne(filter, updateDoc);
        //         if (result) {
        //             res.json(result);
        //         }
        //     } else {
        //         user['orderState'] = 'procced'
        //         const updateDoc = { $set: { user: user.orderState } };
        //         const result = await cartCollection.updateOne(filter, updateDoc);
        //         if (result) {
        //             res.json(result);
        //         }
        //     }
        // })

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