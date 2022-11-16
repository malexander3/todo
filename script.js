document.getElementById("submit-form").addEventListener("submit", add)

const apiKey = "d539e6-ad49af-05fb11-97393a-f9bd2e";

getAll();

function getAll() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          console.log(todos);
          for (i = todos.length - 1; i >= 0; i--) {
            addUp(todos[i]);
          }
      }
  };
  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key",apiKey);
  xhttp.send();
}

function add(event) {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    var data = {
        "text": document.querySelector("#task").value
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            addUp(todo);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data));
}

function addUp(todo){
    var todoText = todo.text;
    var todoId = todo.id;
    var singleToDO = document.createElement("LI");
    singleToDO.innerHTML = todo.text;
    console.log(todo.text);
    singleToDO.setAttribute("id", todo.id);
    //ADD REMOVE BUTTON
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
    //Check
    var checkBut = document.createElement("input");
    checkBut.setAttribute("type", "checkbox");
    checkBut.classList.add("done");
    checkBut.style.position = "relative";
    checkBut.style.top = "5px";
    checkBut.style.left = "5px";
    checkBut.style.width = "20px";
    checkBut.style.height = "20px";
    checkBut.style.borderColor = "#454851";
    // checkBut.setAttributeNode(attr);
    // singleToDO.appendChild(checkBut);
    console.log("Got it!");
    
    //toDoList.removeAllchild()

    //APPEND TO LIST
    singleToDO.setAttribute("id", todoId);
    checkBut.setAttribute("class", "checkBut");
    singleToDO.setAttribute("checkBut", checkBut);
    singleToDO.setAttribute("remove", remove);
    toDoList.appendChild(singleToDO);
    singleToDO.appendChild(checkBut);
    singleToDO.appendChild(remove);
    //Event Listen & reset Input blank
    checkBut.addEventListener("click", function(event){finishToDo(todoId)});
    remove.addEventListener("click", function(event){removeToDo(todoId)});
    document.getElementById("task").value='';
    if (todo.completed == true) {
      document.getElementById(todoId).style.textDecoration = "line-through";
    } 
}

function removeToDo(todoId) {
  var removeId = todoId;
  var xhttp5 = new XMLHttpRequest();
  // Response handler
  xhttp5.onreadystatechange = function() {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      console.log(document.getElementById(removeId))
      document.getElementById(removeId).remove();
    } else if (this.readyState == 4) {
          console.log(this.responseText);
    }
  };
  xhttp5.open("DELETE", "https://cse204.work/todos/" + removeId, true);
  xhttp5.setRequestHeader("Content-type", "application/json");
  xhttp5.setRequestHeader("x-api-key", apiKey);
  xhttp5.send();
}

function finishToDo(todoId){
  var completeId = todoId;
  var data = {
    "completed": true
  }
  document.getElementById(completeId).classList.add("done");
  document.getElementById(completeId).style.textDecoration = "line-through";
  var xhttp4 = new XMLHttpRequest();
  // Response handler
  xhttp4.onreadystatechange = function() {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {

    } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  };
      xhttp4.open("PUT", "https://cse204.work/todos/" + todoId, true);
      xhttp4.setRequestHeader("Content-type", "application/json");
      xhttp4.setRequestHeader("x-api-key", apiKey);
      xhttp4.send(JSON.stringify(data));
}