const BookController = require('../controllers/book_controller');
const PageUpdateController = require('../controllers/page_update_controller');
const GoalController = require('../controllers/goal_controller');
const TbrController = require('../controllers/tbr_controller');

module.exports = (app) => {
    

    //Book Controller
    app.get('/api/book/', BookController.greeting);
    app.post('/api/book/create', BookController.create);
    app.post('/api/book/delete', BookController.delete);
    app.get('/api/book/fetchAllUnread', BookController.fetchAllUnread);
    app.post('/api/book/updatePageCount', BookController.updatePageCount);
    app.post('/api/book/fetchReadBooksCount', BookController.fetchAllRead);
    app.post('/api/book/fetchMonthlyBookBreakup', BookController.fetchMonthlyBookBreakup);

    //Page Update Controller
    app.get('/api/pageUpdate/', PageUpdateController.greeting);
    app.post('/api/pageUpdate/create', PageUpdateController.create);
    app.post('/api/pageUpdate/fetchPageCount', PageUpdateController.fetchPageCount);
    app.post('/api/pageUpdate/fetchMonthlyPageBreakup', PageUpdateController.fetchMonthlyPageBreakup);

    //Goal Update Controller
    app.get('/api/goal/', GoalController.greeting);
    app.post('/api/goal/updateGoal', GoalController.upsertGoal);
    app.post('/api/goal/getGoal', GoalController.findGoal);

    //TBR List Controller
    app.get('/api/tbr/', TbrController.greeting);
    app.post('/api/tbr/create/', TbrController.create);
    app.post('/api/tbr/delete/', TbrController.delete);
    app.get('/api/tbr/fetchTBR/', TbrController.fetchAllTbr);
    app.post('/api/tbr/update', TbrController.updateTbr);
}