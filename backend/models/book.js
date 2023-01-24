const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title of Book is a required field']
    },

    pagesCompleted: {
        type: Number,
        required: [true, 'Pages Completed is a required field'],
        validate: [
            {
                validator: pages => pages >= 0,
                message: 'Pages Completed should be greater than or equal to 0'
            },
            {
                validator: Number.isInteger,
                message: 'Pages Completed must be an integer'
            },
            {
                validator: function(pagesCompleted) {
                    return pagesCompleted <= this.totalPages;
                },
                message: 'Pages Completed must be lesser than Total Pages'
            }
        ]
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
            {
                validator: function(totalPages) {
                    return totalPages >= this.pagesCompleted;
                },
                message: 'Pages Completed must be lesser than Total Pages'
            }
        ]
    },

    dateAdded: {
        type: Date,
        required: [true, 'Date Added is a required field']
    },

    dateCompleted: {
        type: Date,
        validate: [
            {
                validator: function(dateCompleted) {
                    return dateCompleted >= this.dateAdded
                },
                message: 'Date Added should be smaller than or equal to Date Completed'
            }
        ]
    }
});

const Book = mongoose.model('book', BookSchema);
module.exports = Book;