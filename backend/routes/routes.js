const BookController = require('../controllers/book_controller');
const PageUpdateController = require('../controllers/page_update_controller');

module.exports = (app) => {
    

    //Book Controller
    app.get('/api/book/', BookController.greeting);

    //Page Update Controller
    app.get('/api/pageUpdate/', PageUpdateController.greeting);
}