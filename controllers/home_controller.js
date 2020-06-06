const Task = require('../models/task');

module.exports.home = async function(request,response)
{
    let task = await Task.find({}).sort('-createdAt');
    return response.render('home',{tasks:task});
}