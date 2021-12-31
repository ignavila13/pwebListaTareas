function addTask(){
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var checkbox = "<input type='checkbox' id='chkTask'>";
    var btnClipboard = "<button type='button' id='btnClipboard' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
    var btnShare = "<button type='button' id='btnShare' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
    var btnDelete = "<button type='button' id='btnDelete' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
    var taskWrited = document.getElementById("writeTask").value;
    var spanTask = "<span id='spanTask' value='"+taskWrited+"'>"+taskWrited+"</span>"
    li.innerHTML = checkbox + spanTask + btnClipboard + btnShare + btnDelete;
    ul.appendChild(li);
}

function deleteTask(getTask){
    getTask.closest("li").remove();
}

function copyTask(element){
    var taskCopied = $(element).closest("li").find("#spanTask").text();
    navigator.clipboard.writeText(taskCopied);
    alert("Tarea '"+taskCopied+"' copiada con exito!");
}

function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("imgFullscreen").src="icons/fullscreen-exit.svg";
        
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("imgFullscreen").src="icons/fullscreen.svg";
        

      }
    }
  }

  function shareTask(element) {
    if (!("share" in navigator)) {
      alert('Web Share API not supported.');
      return;
    }

    var miTask = $(element).closest("li").find("#spanTask").text();
  
    navigator.share({
        title: 'Compartiendo mi tarea!',
        text: miTask
      })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error));
  }



  




