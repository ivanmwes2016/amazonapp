import express from 'express'
import data from './data.js';
import cors from 'cors'
// let cors = require("cors")


const app = express();
app.use(cors())

app.get('/api/products/', (req, res) =>{
    res.send(data.products)
})

app.get('/api/products/:slug', (req, res) =>{
    const product = data.products.find(x => x.slug === req.params.slug)
    if (product){
        res.send(product)
    }else{
        res.status(404).send("Product not found")
    }
})

const port = process.env.PORT || 7777
app.listen(port, () => {
    console.log(`server is at: http://localhost:${port}`)
})

