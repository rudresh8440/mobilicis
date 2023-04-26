const mongoose = require('mongoose');

const User = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    income: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    car: {
        type: String,
        require: true,
    },
    quote: {
        type: String,
        require: true,
    },
    phone_price: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("User", User);