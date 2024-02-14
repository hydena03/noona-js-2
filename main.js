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
let taskList = []
addButton.addEventListener("click",addTask);

function addTask(){
let task ={
  id:randomIDGenerate(),
  taskContent: taskInput.value,
  isComplete:false
}
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for(let i = 0; i < taskList.length; i++){
if(taskList[i].isComplete == true){
  resultHTML+=`<div class="task">
  <div class = "task-done">${taskList[i].taskContent}</div>
  <div>
    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-undo" aria-hidden="true"></i></button>
    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
  </div>
  </div>`;
}else{
  resultHTML += `<div class="task">
  <div>${taskList[i].taskContent}</div>
  <div>
    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-check" aria-hidden="true"></i></button>
    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
  </div>
  </div>`;
}

  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id ==id){
      taskList[i].isComplete= !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
  if(taskList[i].id == id){
    taskList.splice(i, 1)
    break;
  }
}
render();
}


function randomIDGenerate(){
  return "_" + Math.random().toString(36).substr(2, 9);
}

