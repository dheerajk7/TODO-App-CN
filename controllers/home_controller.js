const Task = require('../models/task');

//returing all the task to home page
module.exports.home = async function(request,response)
{
    let task = await Task.find({}).sort('-createdAt');
    return response.render('home',{tasks:task});
}