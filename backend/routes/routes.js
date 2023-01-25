const BookController = require('../controllers/book_controller');
const PageUpdateController = require('../controllers/page_update_controller');

module.exports = (app) => {
    

    //Book Controller
    app.get('/api/book/', BookController.greeting);
    app.post('/api/book/create', BookController.create);
    app.post('/api/book/delete', BookController.delete);
    app.get('/api/book/fetchAllUnread', BookController.fetchAllUnread);

    //Page Update Controller
    app.get('/api/pageUpdate/', PageUpdateController.greeting);
    app.post('/api/pageUpdate/create', PageUpdateController.create);
}