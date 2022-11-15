document.getElementById("submit-form").addEventListener("submit", add)

const apiKey = "d539e6-ad49af-05fb11-97393a-f9bd2e"

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
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data));
    postToDo();
}

function postToDo(){
    var xhttp3 = new XMLHttpRequest();
    var data = {
        "text": document.querySelector("#task").value
    };
    xhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        addUp(todo);
          // addUp(data);
          // for(var i=0; i<todo.length;i++){
          //   addUp(todo[i]);
          //   console.log(todo[i])
          // }
        // addUp(todo);//
        //console.log(todo[i]);
      } else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };
  
    xhttp3.open("POST", "https://cse204.work/todos", true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key", apiKey);
    xhttp3.send(JSON.stringify(data));
  
  
     document.getElementById("myInput").value = "";  
}

function addUp(todo){
    var todoText = todo.text;
    var todoId = todo.id;
    var singleToDO = document.createElement("LI");
    singleToDO.innerHTML = todo.text;
    console.log(todo.text);

    singleToDO.setAttribute("id", todo.id);

    //Check
    var checkBut = document.createElement("input");
    checkBut.setAttribute("type", "checkbox");
    checkBut.classList.add("done");
    // checkBut.style.position = "relative";
    // checkBut.style.top = "-57.5px";
    // checkBut.style.left = "5px";

    // checkBut.setAttributeNode(attr);
    // singleToDO.appendChild(checkBut);

    console.log("Got it!");
    //ADD REMOVE BUTTON
    var remove = document.createElement("button");
    remove.innerHTML = "DELETE";
    remove.setAttribute("class", "remove");
    // remove.style.position = "relative";
    // remove.style.top = "-50px";
    // remove.style.right = "-1100px";
    // remove.style.position = "relative";
    // remove.style.top = "-40px";
    // remove.style.left = "5px";
    // remove.className = "close";
    // remove.appendChild(del);
    // singleToDO.appendChild(remove);

    //

    var toDoList = document.getElementById("list");
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
    document.getElementById("myInput").value='';
}