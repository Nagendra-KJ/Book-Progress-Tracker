const Book = require('../models/book');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'kenobi'});
    },

    create(req, res, next)  {
        const BookProps = req.body;
        Book.create(BookProps)
                .then((Book) => res.send(Book))
                .catch(next);
    },

    delete(req, res, next)  {
        const bookId = req.body.id;
        Book.findByIdAndDelete(bookId)
            .then((result) => {
                res.send(result)
            })
            .catch(next);
    },

    fetchAllUnread(req, res, next)  {
        const buildQuery = {};

        buildQuery.dateCompleted = {
            $exists: false
        }
        Book.find(buildQuery)
            .then((books) =>
            res.send(books))
            .catch(next);
    },

    updatePageCount(req, res, next) {
        const bookId = req.body.id;
        const newPages = req.body.pageCount;
        const dateCompleted = req.body.dateCompleted;
        Book.findByIdAndUpdate(bookId, {pagesCompleted: newPages, dateCompleted: dateCompleted})
            .then((result) => res.send(result))
            .catch(next);
    },

    fetchAllRead(req, res, next) {
        const buildQuery = {};

        buildQuery.dateCompleted = {
            $gte: req.body.startDate,
            $lt: req.body.endDate
        }
        console.log(buildQuery);
        Book.countDocuments(buildQuery)
            .then((count) =>
            res.send({count}))
            .catch(next);
    }

}