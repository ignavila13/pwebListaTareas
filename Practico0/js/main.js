function addTask(){
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var checkbox = "<input type='checkbox' id='chkTask'>";
    var btnDelete = "<button type='button' id='btnDelete' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
    var taskWrited = document.getElementById("writeTask").value;
    var spanTask = "<span>"+taskWrited+"</span>"
    li.innerHTML = checkbox + spanTask + btnDelete;
    ul.appendChild(li);
}

function deleteTask(getTask){
    getTask.closest("li").remove();
}

