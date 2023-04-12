const projectsRouter = require('./Routes/projects.route');
const socialLinksRouter = require('./Routes/socialLinks.router');
const { app } = require('./middlewares');
const notificationRouter = require('./Routes/notification.router');
const port = process.env.PORT || 2001;
async function run() {
    try {
        app.use('/projects', projectsRouter)
        app.use('/sociallinks', socialLinksRouter)
        app.use('/notification', notificationRouter)

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
    
