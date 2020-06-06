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
        }
    );

    //removing DOM of all checked Id
    for(id of checkedItem)
    {
        $(`#item-${id}`).remove();
    }
});