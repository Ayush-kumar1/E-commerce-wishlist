import express from 'express';
import mongoose from 'mongoose';
import Cards from "./dbSchema.js"
import Cors from 'cors';

// password- sffx3j1RQ2ODt7AH

const dbURL = "mongodb+srv://admin:sffx3j1RQ2ODt7AH@cluster0.6hle8.mongodb.net/WishlistDB?retryWrites=true&w=majority"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(Cors())

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.post("/wishlist", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/wishlist', (req, res) => {


    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

})

app.delete("/wishlist/:id", async(req, res) => {

    try {

        const del = await Cards.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(del)

    } catch (err) {
        res.status(500).send(err)
    }
})


app.get("/", (req, res) => res.status(200).send("Hello awesome programers"));

app.listen(port, () => console.log(`listening on port: ${port}`))