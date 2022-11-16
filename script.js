document.getElementById("submit-form").addEventListener("submit", add)

const apiKey = "da1cfd-c4a812-8f3308-5bb650-9c02f0";

getAll();

function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          console.log(todos);
          for (i = todos.length - 1; i >= 0; i--) {
            add(todos[i]);
          }
      }
  };
  http.open("GET", "https://cse204.work/todos", true);
  http.setRequestHeader("x-api-key",apiKey);
  http.send();
}

function add(event) {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var data = {
        "text": document.querySelector("#task").value
    };
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            adding(todo);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    http.open("POST", "https://cse204.work/todos", true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader("x-api-key", apiKey);
    http.send(JSON.stringify(data));
}

function adding(todo){
    var todoText = todo.text;
    var todoId = todo.id;
    var singleToDO = document.createElement("LI");
    singleToDO.innerHTML = todo.text;
    console.log(todo.text);
    singleToDO.setAttribute("id", todo.id);
    
    var remove = document.createElement("button");
    remove.innerHTML = "&#120;";
    remove.style.borderColor = "transparent";
    remove.style.backgroundColor = "transparent";
    remove.style.color = "red";
    remove.style.fontSize = "34px";
    remove.style.position = "relative";
    remove.style.top = "4px";
    remove.setAttribute("class", "remove");
    var toDoList = document.getElementById("list");
    
    var checkBut = document.createElement("input");
    checkBut.setAttribute("type", "checkbox");
    checkBut.classList.add("done");
    checkBut.style.position = "relative";
    checkBut.style.top = "5px";
    checkBut.style.left = "5px";
    checkBut.style.width = "20px";
    checkBut.style.height = "20px";
    checkBut.style.borderColor = "#454851";
    
    console.log("Got it!");
    
   

    
    singleToDO.setAttribute("id", todoId);
    checkBut.setAttribute("class", "checkBut");
    singleToDO.setAttribute("checkBut", checkBut);
    singleToDO.setAttribute("remove", remove);
    toDoList.appendChild(singleToDO);
    singleToDO.appendChild(checkBut);
    singleToDO.appendChild(remove);
   
    checkBut.addEventListener("click", function(event){finishToDo(todoId)});
    remove.addEventListener("click", function(event){removeToDo(todoId)});
    document.getElementById("task").value='';
    if (todo.completed == true) {
      document.getElementById(todoId).style.textDecoration = "line-through";
    } 
}

function removeToDo(todoId) {
  var removeId = todoId;
  var ht5 = new XMLHttpRequest();
  
  ht5.onreadystatechange = function() {
   
    if (this.readyState == 4 && this.status == 200) {
      console.log(document.getElementById(removeId))
      document.getElementById(removeId).remove();
    } else if (this.readyState == 4) {
          console.log(this.responseText);
    }
  };
  ht5.open("DELETE", "https://cse204.work/todos/" + removeId, true);
  ht5.setRequestHeader("Content-type", "application/json");
  ht5.setRequestHeader("x-api-key", apiKey);
  ht5.send();
}

function finishToDo(todoId){
  var completeId = todoId;
  var data = {
    "completed": true
  }
  document.getElementById(completeId).classList.add("done");
  document.getElementById(completeId).style.textDecoration = "line-through";
  var ht4 = new XMLHttpRequest();
 
  ht4.onreadystatechange = function() {
   
    if (this.readyState == 4 && this.status == 200) {

    } else if (this.readyState == 4) {
      
      console.log(this.responseText);
    }
  };
      ht4.open("PUT", "https://cse204.work/todos/" + todoId, true);
      ht4.setRequestHeader("Content-type", "application/json");
      ht4.setRequestHeader("x-api-key", apiKey);
      ht4.send(JSON.stringify(data));
}