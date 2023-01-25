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
        var dateCompleted;
        if (req.body.dateCompleted)
            dateCompleted = new Date(req.body.dateCompleted);
        Book.findByIdAndUpdate(bookId, {pagesCompleted: newPages, dateCompleted: dateCompleted})
            .then((result) => res.send(result))
            .catch(next);
    },

    fetchAllRead(req, res, next) {
        const buildQuery = {};

        buildQuery.dateCompleted = {
            $gte: new Date(req.body.startDate),
            $lt: new Date(req.body.endDate)
        }
        Book.countDocuments(buildQuery)
            .then((count) =>
            res.send({count}))
            .catch(next);
    }

}