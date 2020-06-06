const express = require('express');
const port = 8000;
const app = express();

//setting template engine
app.set('viwe engine','ejs');
app.set('views','./views');

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