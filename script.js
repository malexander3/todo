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
    var instance = document.createElement("LI");
    instance.innerHTML = todo.text;
    console.log(todo.text);
    instance.setAttribute("id", todo.id);
    
    var remove = document.createElement("button");
    remove.innerHTML = "&#120;";
    remove.style.borderColor = "blue";
    remove.style.backgroundColor = "transparent";
    remove.style.color = "red";
    remove.style.fontSize = "36px";
    remove.style.position = "relative";
    remove.style.top = "6px";
    remove.setAttribute("class", "remove");
    var toDoList = document.getElementById("list");
    
    var checked = document.createElement("input");
    checked.setAttribute("type", "checkbox");
    checked.classList.add("done");
    checked.style.position = "relative";
    checked.style.top = "7px";
    checked.style.left = "7px";
    checked.style.width = "25px";
    checked.style.height = "25px";
    checked.style.borderColor = "blue";
    
    console.log("Received!");
    
   

    
    instance.setAttribute("id", todoId);
    checked.setAttribute("class", "checked");
    instance.setAttribute("checked", checked);
    instance.setAttribute("remove", remove);
    toDoList.appendChild(instance);
    instance.appendChild(checked);
    instance.appendChild(remove);
   
    checked.addEventListener("click", function(event){crossoff(todoId)});
    remove.addEventListener("click", function(event){removeInstance(todoId)});
    document.getElementById("task").value='';
    if (todo.completed == true) {
      document.getElementById(todoId).style.textDecoration = "line-through";
    } 
}

function removeInstance(todoId) {
  var idRemoval = todoId;
  var ht5 = new XMLHttpRequest();
  
  ht5.onreadystatechange = function() {
   
    if (this.readyState == 4 && this.status == 200) {
      console.log(document.getElementById(idRemoval))
      document.getElementById(idRemoval).remove();
    } else if (this.readyState == 4) {
          console.log(this.responseText);
    }
  };
  ht5.open("DELETE", "https://cse204.work/todos/" + idRemoval, true);
  ht5.setRequestHeader("Content-type", "application/json");
  ht5.setRequestHeader("x-api-key", apiKey);
  ht5.send();
}

function crossoff(todoId){
  var totalId = todoId;
  var data = {
    "completed": true
  }
  document.getElementById(totalId).classList.add("done");
  document.getElementById(totalId).style.textDecoration = "line-through";
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