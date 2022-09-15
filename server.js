const { projectsCollection, client } = require('./Connections/mongodb.client');
const projectsRouter = require('./Routes/projects.route');
const  {app}  = require('./middlewares');
const port = process.env.PORT || 2001;

async function run() {
    try {
        // await client.connect()

        app.use('/projects', projectsRouter)
        // projects collection
        // app.post('/projects', async (req, res) => {
        //     let files = req.files;
        //     if (files) {
        //         for (let img in files) {
        //             files[img] = (await cloudinary.v2.uploader.upload(files[img].tempFilePath, { folder: 'portfolio/projects' }, (err, res) => res?.url)).url
        //             req.body[img] = files[img]
        //         }
        //     }
        //     req.body.createDate = new Date().toLocaleString()
        //     const result = await projectsCollection.insertOne(req.body).then(resu => {
        //         resu.acknowledged && fs.rmdirSync('./tmp', { force: true, recursive: true });
        //         res.json(resu)
        //     })
        // });

        // app.get('/projects', async (req, res) => {
        //     const { items } = req.query
        //     let result;
        //     if (items) {
        //         result = await projectsCollection.find().sort({ "postDate": -1 }).limit(parseInt(items)).toArray();
        //     } else {
        //         result = await projectsCollection.find({}).toArray();
        //     }
        //     res.json(result)
        // });
        // app.get('/projects/:id', );
        // app.delete('/projects/:id', )
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