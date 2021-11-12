const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6w1pi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

// async function
async function run() {
    try {
        await client.connect();
        const database = client.db('Nailphilia');
        const productsCollection = database.collection('products');
        const reviewsCollection = database.collection('reviews');
        const purchasesCollection = database.collection('purchases');

        // GET PRODUCTS API
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        // POST PRODUCTS API
        app.post('/products', async (req, res) => {
            const product = req.body;
            console.log('Hit the post api', product);
            const result = await productsCollection.insertOne(product);
            console.log(result);
            res.json(result);
        });


        // GET REVIEWS API
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        // GET Single Review
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific review', id);
            const query = { _id: ObjectId(id) };
            const review = await reviewsCollection.findOne(query);
            res.json(service);
        })

        // POST REVIEWS API
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            console.log('Hit the review post api', review);
            const result = await reviewsCollection.insertOne(review);
            console.log(result);
            console.log(result);
            res.json(result);
        });



        // POST PURCHASES API
        app.post('/product/:productId', async (req, res) => {

        })

        // DELETE API
        //  app.delete('/reviews/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await reviewsCollection.deleteOne(query);
        //     res.json(result);
        // })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Nailphilia Server Is Running');
});


app.listen(port, () => {
    console.log('Server running at port', port);
})


