const Book = require('../models/book');

module.exports = {

    greeting(req, res, next) {
        res.send({hello:'there', general:'kenobi'});
    },

    create(req, res, next)
    {
        const BookProps = req.body;
        Book.create(BookProps)
                .then((Book) => res.send(Book))
                .catch(next);
    },
}