const Task = require('../models/task');

//creating Task
module.exports.createTask = async function(request,response)
{
    try
    {
        let month = 
        {
            '01':'JAN',
            '02':'FEB',
            '03':'MAR',
            '04':'APR',
            '05':'MAY',
            '06':'JUN',
            '07':'JUL',
            '08':'AUG',
            '09':'SEP',
            '10':'OCT',
            '11':'NOV',
            '12':'DEC',
        };
        let dateString = request.body.date;
        let dateArray = dateString.split('-');
        let finalDateString = dateArray[2] + '-'+ month[dateArray[1]]+ '-' + dateArray[0];
        let task = await Task.create(
            {
                description:request.body.desc,
                category:request.body.category,
                date:finalDateString,
            }
        );
        
        if(request.xhr)
        {
            return response.status(200).json(
                {
                    data:
                    {
                        task:task,
                    },
                    message:'Task Added',
                }
            );
        }
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