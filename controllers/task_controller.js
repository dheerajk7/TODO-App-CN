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

module.exports.delete = async function(request,response)
{
    try
    {
        //iterating over array of id and deleting that items
        for(item of request.query.info)
        {
            await Task.findByIdAndDelete(item);
        }
        if(request.xhr)
        {
            return response.status(200).json(
                {
                    message:'Deleted Successfully'
                }
            );
        }
        return response.redirect('/');
    }
    catch(err)
    {
        return response.status(500).json(
            {
                message:'Internal Server Error',
            }
        );
    }
}