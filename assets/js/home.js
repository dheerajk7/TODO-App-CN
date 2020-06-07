
let createTask = function()
{
    let newTaskForm = $('#new-task-form');

    newTaskForm.submit(function(event)
    {
        event.preventDefault();
        $.ajax(
            {
                type:'post',
                url:'/task/create-task',
                data:newTaskForm.serialize(),
                success:function(data)
                {
                    let newTaskDOM = createTaskDOM(data.data.task);
                    $('#task-list').prepend(newTaskDOM);
                },
                error:function(data)
                {
                    console.log(data.message);
                }
            }
        );
    });
}

let createTaskDOM = function(task)
{
    return $(
        `<li id="item-${task._id}" class="item" style="border: 2px solid black;border-radius: 10px;margin: 5px;">
        <input class="checkbox" id="${task._id}" type="checkbox"></div>
        <br>
        <div>${task.description}</div>
        <br>
        <div>${task.category}</div>
        <br>
        <div>${task.date}</div>
        <br>
    </li>`
    );
}
createTask();

//fetching delete button
$('#delete').click(function()
{
    //fethcing all the checkbox
    let allCheckbox = document.querySelectorAll('.item .checkbox');
    let checkedItem = [];
    //collecting id of all the checked checkbox
    for(item of allCheckbox)
    {
        if(item.checked)
        {
            checkedItem.push(item.id);
        }
    }
    //deleting all the task with checked id 
    $.ajax(
        {
            type:'get',
            url:'task/delete',
            data:{info:checkedItem},
            error:function(error)
            {
                console.log('a');
            }
        }
    );

    //removing DOM of all checked Id
    for(id of checkedItem)
    {
        $(`#item-${id}`).remove();
    }
});