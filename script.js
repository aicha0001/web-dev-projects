// step 1 
let addButton = document.getElementById('add-task')
let newTaskInput = document.getElementById('task-input')
let todoListContainer = document.getElementById('todolist')

let templateElement = document.getElementById('list-item-template');
let template = templateElement.innerHTML;
let showActiveButton = document.getElementById("show-active")
let showAllButton = document.getElementById("show-all")
let showCompletedButton = document.getElementById("show-completed")

// save to local storage 
function saveTask(name, isCompleted){
    localStorage.setItem(name,isCompleted)
}

// function to read from local storage and read it 
function renderTasks(){
    for(let i=0; i<localStorage.length; i++){
        let taskName = localStorage.key(i)
        let isCompleted= localStorage.getItem(taskName) == "true";
        
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if(!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }
    }

}
// step 2 
function onAddTaskClicked(e){
    let taskName = newTaskInput.value;
    newTaskInput.value= "";

    if(taskName!=""){

    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
    saveTask(taskName, false);
    }
    
}

// create the active task Button
function onTodoListClicked(e){
     let targetElement = e.target;
    while (!targetElement.classList.contains("task")){
        targetElement = targetElement.parentElement;
    }
    let checkbox = targetElement.querySelector(".checkbox");

    if(checkbox.checked){
        targetElement.classList.add("completed");
    }
    else{
        targetElement.classList.remove("completed");
    }
    let TaskNameElement = targetElement.querySelector(".task-name");
    let taskName = TaskNameElement.innerText;
    
    saveTask(taskName,checkbox.checked);
}

function showActiveTasks(e){
    let tasks = document.getElementsByClassName("task");
    for(let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "none";
        }
        else{
            tasks[i].style.display= "block";
        }
    }

}    
// create the show all Task Button
    function onTodoListClicked(e){
        let targetElement = e.target;
       while (!targetElement.classList.contains("task")){
           targetElement = targetElement.parentElement;
       }
       let checkbox = targetElement.querySelector(".checkbox");
   
       if(checkbox.checked){
           targetElement.classList.add("completed");
       }
       else{
           targetElement.classList.remove("completed");
       }
       let TaskNameElement = targetElement.querySelector(".task-name");
       let taskName = TaskNameElement.innerText;
       
       saveTask(taskName,checkbox.checked);
   }
   
   function showAllTasks(e){
       let tasks = document.getElementsByClassName("task");
       for(let i=0; i<tasks.length; i++){
           tasks[i].style.display= "block";
           }
       }   

// create the completed button 
function onTodoListClicked(e){
    let targetElement = e.target;
   while (!targetElement.classList.contains("task")){
       targetElement = targetElement.parentElement;
   }
   let checkbox = targetElement.querySelector(".checkbox");

   if(checkbox.checked){
       targetElement.classList.add("completed");
   }
   else{
       targetElement.classList.remove("active");
   }
   let TaskNameElement = targetElement.querySelector(".task-name");
   let taskName = TaskNameElement.innerText;
   
   saveTask(taskName,checkbox.checked);
}

function showCompletedTasks(e){
   let tasks = document.getElementsByClassName("task");
   for(let i=0; i<tasks.length; i++){
       if (tasks[i].classList.contains("completed")){
           tasks[i].style.display = "block";
       }
       else{
           tasks[i].style.display= "none";
       }
   }
}
// step 3
addButton.addEventListener('click', onAddTaskClicked)
todoListContainer.addEventListener('click', onTodoListClicked);
showActiveButton.addEventListener('click', showActiveTasks)
showCompletedButton.addEventListener('click',showCompletedTasks)
showAllButton.addEventListener('click',showAllTasks)
renderTasks();

