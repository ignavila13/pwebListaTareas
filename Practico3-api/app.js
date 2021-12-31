


const url = "http://localhost:3000/tasks";
let root = document.querySelector(":root");


let arrayTask = [];

//darkOrLigth();

window.onload = () => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
      tasks = data == null ? [] : data
      console.log(tasks)
      tasks.map((task) => {structure(task)})
  })
  .catch((err) => {
      console.log(err)
  })
}


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


//Insert
async function sendTaskToDB(){

  var valueGeolocation = await getPosition();
  var valueTask = document.getElementById("writeTask").value;
  var valueCheck = false;

  objectTask = {
    id: Date.now(),
    task: valueTask,
    state: valueCheck,
    geolocation: valueGeolocation
  }

config = {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(objectTask)
}

fetch(url, config)
    .then(response => response.json())
    .then(data => {
      
        structure(data)
        valueTask = null
    })
    .catch((err) => {
        console.log(err)
    })

}
//Delete
function deleteTask(getTask){

  config = {
    method:'DELETE'
  }
  fetch(url+'/'+getTask.id, config)
    .then(response =>{
      response.json()
      getTask.closest("li").remove();
    })
}
//Update
function updateTask(checkBox){
  
  config = {
    method: 'PATCH',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({state: checkBox.checked})
  }
  
  fetch(`${url}/${checkBox.id}`, config)
    .then(response => {response.json()})
  
}

//This define the structure of task
function structure(task){
  console.log(task);
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.id = "li"+task._id;
    
    if(String(task.state) == "true"){
      console.log("ingreso if");
      var checkbox = "<input type='checkbox' id='"+task._id+"' class='style_check' onclick='updateTask(this)' checked>";
    } else{
      console.log("ingreso else");

      var checkbox = "<input type='checkbox' id='"+task._id+"' class='style_check' onclick='updateTask(this)'>";
    }
  
    var btnClipboard = "<button type='button' id='btnClipboard' class='button_style btn_task' onclick='copyTask(this)'><img id='imgClipboard' src='icons/clipboard.svg'></button>";
    var btnShare = "<button type='button' id='btnShare' class='button_style btn_task' onclick='shareTask(this)'><img id='imgShare' src='icons/share.svg'></button>";
    var btnDelete = "<button type='button' id='"+task._id+"' class='button_style btn_task' onclick='deleteTask(this)'><img id='imgDelete' src='icons/delete.svg'></button>";
    var spanTask = "<span id='spanTask' class='span_task' value='"+task.task+"'>"+task.task+"</span>";
    li.innerHTML = "<div id='spanTask' class='div_container_task'> <div class='element_task div_checkbox'>"+checkbox+"</div> <div class='element_task div_text_input'>"+ spanTask +"</div> <div class='element_task div_buttons'>"+ btnClipboard + btnShare + btnDelete+"</div></div>";
    
    ul.appendChild(li);
  
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

//Functions of buttons
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


