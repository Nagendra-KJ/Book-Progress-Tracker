const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PageUpdateSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title of Book is a required field']
    },

    pagesCompleted: {
        type: Number,
        required: [true, 'Pages Completed is a required field'],
        validate: [
            {
                validator: Number.isInteger,
                message: 'Pages Completed must be an integer'
            },
        ]
    },

    date: {
        type: Date,
        required: [true, 'Date is a required field'],
    }
});

const PageUpdate = mongoose.model('pageUpdate', PageUpdateSchema);
module.exports = PageUpdate;