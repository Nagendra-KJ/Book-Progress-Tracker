const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const logger = require('morgan');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost/book_progress_tracker');


mongoose.Promise = global.Promise;


const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send({hello:'world'});
    console.log(routes);
})

routes(app);

app.use((err, req, res, next) =>
{
    res.status(422).send({error: err.message});
}); 

module.exports = app;
