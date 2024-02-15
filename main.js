//유저가 값을 입력
//+버튼 클릭->할일 추가
//지우기 버튼->할일 삭제
//체크버튼->밑줄
//1. check버튼-> true/false
//2. tru이면 끝->밑줄
//3.false 안끝난걸로 간주
//진행중 끝남 탭->언더바 이동
//진행중->진행중 아이템 ,끝남->끝남 아이템


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = 'all';
let filterList = [];


addButton.addEventListener("click", handleTaskInput);
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    handleTaskInput();
  }
});

function handleTaskInput() {
  if (taskInput.value.trim() !== "") {
    addTask();
    taskInput.value = "";
  } else {
    alert("할일을 입력하세요!");
  }
}

taskInput.addEventListener("click", function() {
  taskInput.value = "";
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}



function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}



function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-undo" aria-hidden="true"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check" aria-hidden="true"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id){
  if(mode=="all"){ 
      for(let i=0; i<taskList.length; i++){ 
          if(taskList[i].id == id){ 
              taskList.splice(i,1);
              break;
          }
      }
      render(); 
  } else if(mode=="ongoing"||mode=="done") {
      for(let i=0; i< filterList.length; i++){ 
          if(filterList[i].id == id || taskList[i].id == id){
              filterList.splice(i,1);
              for(let i=0; i<taskList.length; i++){
                  if(taskList[i].id == id){
                      taskList.splice(i,1);
                      break;
                  }
              }
              break;
          }
      }
      render();
  } 
}

function filter(event) {
  mode = event.target.id;
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";

  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}