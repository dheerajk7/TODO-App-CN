const express = require('express');
const port = 8000;
const app = express();

//parsing form data
app.use(express.urlencoded({useNewUrlParser:true}));

//using static files
app.use(express.static('./assets'));

//setting template engine
app.set('view engine','ejs');
app.set('views','./views');

//using router 
app.use('/',require('./routes/index.js'));

//connecting to database
const db = require('./config/mongoose');

//running server
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server');
        return;
    }
    console.log('Server is running and up at port ',port);
    return;
});