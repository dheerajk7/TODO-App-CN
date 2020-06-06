const Task = require('../models/task');

//creating Task
module.exports.createTask = async function(request,response)
{
    try
    {
        let task = await Task.create(
            {
                description:request.body.desc,
                category:request.body.category,
                date:request.body.date,
            }
        );
        return response.redirect('back');
    }
    catch(err)
    {
        console.log('Error in creating Task');
        return;
    }
}

//deleting a task using Ajax call
module.exports.deleteTask = async function(request,response)
{
    try
    {
        let task = await Task.findById(request.params.id);
        if(task)
        {
            let deleteTask = await Task.deleteOne({_id:task._id});
            return response.redirect('back');
        }
        else
        {
            console.log('Error in deleting task');
            return response.redirect('back');
        }
    
    }
    catch(err)
    {
        console.log('Error in deleting task');
        return response.redirect('back');
    }
}