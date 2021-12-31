
let arrayTask = [];

darkOrLigth();
getElementFromLocalStorage();


function darkOrLigth(){
  if (window.matchMedia){

    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.body.classList.add("dark");
      
    } else{
      document.body.classList.add("ligth");
    }

    
  } else{
    console.log("No soportado!");
  }
}



async function sendTaskToLS(){

  var valueGeolocation = await getPosition();
  var valueTask = document.getElementById("writeTask").value;
  var valueCheck = "false";
  
  const objectTask = {
    id: Date.now(),
    task: valueTask,
    state: valueCheck,
    geolocation: valueGeolocation
  }
  
  arrayTask.push(objectTask);

  window['localStorage'].setItem('Task', JSON.stringify(arrayTask));

  structure(objectTask.id, objectTask.task, objectTask.state);

}

function structure(id, task, valueCheck){

  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.id = "li"+id;
  
  if(String(valueCheck) == "true"){
    var checkbox = "<input type='checkbox' id='"+id+"' class='style_check' onclick='eventCkeckbox(this)' checked>";
  } else{
    var checkbox = "<input type='checkbox' id='"+id+"' class='style_check' onclick='eventCkeckbox(this)'>";
  }

  var btnClipboard = "<button type='button' id='btnClipboard' class='button_style btn_task' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
  var btnShare = "<button type='button' id='btnShare' class='button_style btn_task' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
  //var btnDelete = "<button type='button' id='btnDelete id"+id+"' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
  var btnDelete = "<button type='button' id='"+id+"' class='button_style btn_task' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
  var spanTask = "<span id='spanTask' class='span_task' value='"+task+"'>"+task+"</span>";
  li.innerHTML = "<div id='spanTask' class='div_container_task'> <div class='element_task div_checkbox'>"+checkbox+"</div> <div class='element_task div_text_input'>"+ spanTask +"</div> <div class='element_task div_buttons'>"+ btnClipboard + btnShare + btnDelete+"</div></div>";
  innerTask = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
  //"<div id='spanTask' class='div_container_task'><div class='div_checkbox'>"+checkbox+"</div> <div class='div_text_input'>"+ spanTask +"</div> <div class='div_buttons'>"+ btnClipboard + btnShare + btnDelete+"</div></div>";
  
  ul.appendChild(li);

}

function getElementFromLocalStorage(){

  if(window['localStorage'].getItem('Task') !== undefined && window['localStorage'].getItem('Task')){

      console.log("Hay elementos en LocalStorage");
      var taskFromLS = JSON.parse(window['localStorage'].getItem('Task')) || [];
      arrayTask = taskFromLS;
      taskFromLS.forEach(tasks => {
        structure(tasks.id, tasks.task, tasks.state); 
      });

  } else{
    console.log("No hay elementos en LocalStorage");
  }

}

const getPosition = async () => {
  if ('geolocation' in navigator) {
      const location = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
    };
  } else {
      alert("Your browser doesn't support geolocation.");
      return {
        lat: null,
        lon: null,
    };
  }
};

function eventCkeckbox(checkBox){
  var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));

  taskFromLS.forEach(tasks => {
    if(String(tasks.id) == checkBox.id){
      console.log("Ingrese al if del eventCkeckbox");
      tasks.state = checkBox.checked;
    }
  });
  localStorage.setItem('Task', JSON.stringify(taskFromLS));
  
}

function deleteTask(getTask){
  //elimino la tarea en el html
  var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));
  getTask.closest("li").remove();

  //elimino la tarea en el LS
  let elementToDelete = taskFromLS.findIndex(task => task.id === getTask.id);
  taskFromLS.splice(elementToDelete, 1);
  let taskFromLSSTRING = JSON.stringify(taskFromLS);
  window['localStorage'].setItem("Task", taskFromLSSTRING); 
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


/*
async function sendTaskToLS(){

  var geolocation = await getPosition();
  var task = document.getElementById("writeTask").value;
  var valueCheck = "false";
  var objectTask = new captureTask(id="id"+i, task, valueCheck, geolocation, i);

  
  arrayTask.push(objectTask);

  window['localStorage'].setItem('Task', JSON.stringify(arrayTask));

  structure(id="id"+i, task, valueCheck);

  i++;

}

*/



/*

async function sendTaskToLS(){

  var geolocation = await getPosition();
  var task = document.getElementById("writeTask").value;
  var valueCheck = "false";
  var objectTask;

  if(window['localStorage'].getItem('Task') !== undefined && window['localStorage'].getItem('Task')){
    var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));
    taskFromLS.forEach(tasks => {
        id = task.id;
        task = tasks.task;
        valueCheck = tasks.state;
        geolocation = tasks.geolocation;
        i = tasks.lastI;
        console.log("valor de i en el for: "+i);
        objectTask = new captureTask(id="id"+i, task, valueCheck, geolocation, i);
        arrayTask.push(objectTask);
    });
    console.log("valor de i despues del for: "+i);
    i = i + 1;
    console.log("valor de i + 1: "+i);
    objectTask = new captureTask(id="id"+i, task, valueCheck, geolocation, i);
    arrayTask.push(objectTask);
} else{
  console.log("No hay elementos en LocalStorage");
  objectTask = new captureTask(id="id"+i, task, valueCheck, geolocation, i);
  arrayTask.push(objectTask);
}

  window['localStorage'].setItem('Task', JSON.stringify(arrayTask));
  structure(id="id"+i, task, valueCheck);
  i++;

}

*/