

/* 
Funciones:
- sendTaskToLS() que envíe una tarea al LS y luego retorne las tareas y las envíe a structure()
- structure(valueTask, stateChk) que contenga la estructura de una tarea
*/


//window.onload = getElementFromLocalStorage();

getElementFromLocalStorage();
var i = 0;
let arrayTask = [];


var id = "id"+i;
var idTask = 0;


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


function captureTask(id, valueTask, stateChk, geolocation, lastI){
  this.id = id;
  this.task = valueTask;
  this.state = stateChk;
  this.geolocation = geolocation;
  this.lastI = lastI;
}

function retriveLastI(){
    //si ya hay tareas en localstorage
    var i;
    if(window['localStorage'].getItem('Task') !== undefined && window['localStorage'].getItem('Task')){
      var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));
      taskFromLS.forEach(tasks => {
         i = tasks.lastI;
      });

      return i;
  
  } else{
    console.log("No hay elementos en LocalStorage");
    return i = 0;
  }
}

function structure(id, task, valueCheck){
  //esta funcion generaliza la estructura de una tarea
  //y la inserta en el html

  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.id = "li"+id;
  console.log("Estado del checkbox: "+valueCheck);
  
  if(String(valueCheck) == "true"){
    console.log("Ingrese al if del structure");
    var checkbox = "<input type='checkbox' id='"+id+"' onclick='eventCkeckbox(this)' checked>";
  } else{
    var checkbox = "<input type='checkbox' id='"+id+"' onclick='eventCkeckbox(this)'>";
  }

  var btnClipboard = "<button type='button' id='btnClipboard' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
  var btnShare = "<button type='button' id='btnShare' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
  var btnDelete = "<button type='button' id='btnDelete id"+id+"' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
  var spanTask = "<span id='spanTask' value='"+task+"'>"+task+"</span>";
  li.innerHTML = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
  innerTask = "<div id='spanTask'>"+checkbox + spanTask + btnClipboard + btnShare + btnDelete+"</div>";
  
  ul.appendChild(li);
 

}




function eventCkeckbox(checkBox){
  var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));
  
  

  taskFromLS.forEach(tasks => {
    console.log("el id de la tarea es: "+tasks.id);
    console.log("la class del check es: "+checkBox.id);
    if(String(tasks.id) == checkBox.id){
      console.log("Ingrese al if del eventCkeckbox");
      tasks.state = checkBox.checked;

    }
  });
  localStorage.setItem('Task', JSON.stringify(taskFromLS));
  
  
}

function addTaskFromLocalStorage(taskRetrived){

  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.innerHTML = taskRetrived; 
  ul.appendChild(li);
  
}


function getElementFromLocalStorage(){

  if(window['localStorage'].getItem('Task') !== undefined && window['localStorage'].getItem('Task')){

      console.log("Hay elementos en LocalStorage");
      var taskFromLS = JSON.parse(window['localStorage'].getItem('Task'));

      taskFromLS.forEach(tasks => {
        console.log("tarea: "+tasks.task);
        structure(tasks.id, tasks.task, tasks.state); //deberia llamar a structure(valueTask, stateChk)
      });

  } else{
    console.log("No hay elementos en LocalStorage");
  }

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
        i = task.lastI;
        objectTask = new captureTask(id="id"+i, task, valueCheck, geolocation, i);
        arrayTask.push(objectTask);
        
    });
    objectTask = new captureTask(id="id"+i++, task, valueCheck, geolocation, i++);
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

