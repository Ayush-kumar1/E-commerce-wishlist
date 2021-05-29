import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,

})

export default mongoose.model('Cards', cardSchema)