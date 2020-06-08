let color = {
    'Personal':{'background':'yellow','text':'blue'},
    'Work':{'background':'navajowhite','text':'black'},
    'School':{'background':'aquamarine','text':'blue'},
    'Cleaning':{'background':'black','text':'white'},
    'Other':{'background':'navy','text':'whitesmoke'},
};

//function to change color of category mention in list container according to category
function changeCategoryColor()
{
    let categories = document.querySelectorAll('.category');
    for(category of categories)
    {
        let eleCategory = category.textContent;
        category.style.backgroundColor = color[eleCategory]['background'];
        category.style.color = color[eleCategory]['text'];
    }
}

changeCategoryColor();

//function to creat a task in database and appending DOM of new task in main task list
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
                    addListener(data.data.task._id);
                },
                error:function(data)
                {
                    console.log(data.message);
                }
            }
        );
    });
}

//function to create DOM of new task when new task is added
let createTaskDOM = function(task)
{
    let category = task.category;
    
    return $(
        `<li id="item-${task._id}" class="item">
        <div class="checkbox-container">
            <input class="checkbox" id="${task._id}" type="checkbox">
        </div>
        <div class="item-description-container">
            <div class="task-description">${task.description}</div>
            <div class="task-date">${task.date}</div>
        </div>
        <div class="item-category-container">
            <div class="category" style="background-color:${color[category]['background']};color:${color[category]['text']};">${task.category}</div>
        </div>
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

//adding line-through or hidding category on checkbox condition
let changeAppearance = (id,status) =>
{
    let listItem = document.getElementById('item-'+id);
    let childNodes = listItem.childNodes;
    if(status == true)
    {
        childNodes[3].style.textDecoration = 'line-through';
        childNodes[5].style.opacity = '0';
    }
    else
    {
        childNodes[3].style.textDecoration = 'none';
        childNodes[5].style.opacity = '1';
    }
}

//adding event listner to all the checkbox
let addListener = (id) =>
{
    var element = document.getElementById(id);
    element.addEventListener('click',function()
    {
        changeAppearance(this.id,this.checked);
    });
}

//getting all the checkbox and calling function to add event listner on all of them
var check = document.querySelectorAll('.checkbox');
for(var i=0;i<check.length;i++)
{
    addListener(check[i].id);
}

