const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TbrSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title of Book is a required field'],
        unique: [true, 'Book already exists in TBR list'],
        dropDups: true
    },

    totalPages: {
        type: Number,
        required: [true, 'Total Pages is a required field'],
        validate: [
            {
                validator: pages => pages >= 0,
                message: 'Total Pages should be greater than or equal to 0'
            },
            {
                validator: Number.isInteger,
                message: 'Total Pages must be an integer'
            },
        ]
    },
});

const Tbr = mongoose.model('tbr', TbrSchema);
module.exports = Tbr;