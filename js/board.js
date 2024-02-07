let todos = [
  { id: 0, title: "Putzen", category: "toDo" },
  { id: 1, title: "Kochen", category: "inProgress" },
  { id: 2, title: "Einkaufen", category: "awaitFeedback" },
  { id: 3, title: "Schlafen", category: "closed" },
];

let currentDraggedElement;

function updateHTML() {
  let toDo = todos.filter((todo) => todo["category"] == "toDo");
  document.getElementById("toDo").innerHTML = "";
  for (let index = 0; index < toDo.length; index++) {
    const element = toDo[index];
    document.getElementById("toDo").innerHTML += generateTodoHTML(element);
  }

  let inProgress = todos.filter(
    (inProgress) => inProgress["category"] == "inProgress"
  );
  document.getElementById("inProgress").innerHTML = "";
  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(element);
  }

  let awaitFeedback = todos.filter(
    (awaitFeedback) => awaitFeedback["category"] == "awaitFeedback"
  );
  document.getElementById("awaitFeedback").innerHTML = "";
  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(element);
  }
  let closed = todos.filter((todo) => todo["category"] == "closed");
  document.getElementById("closed").innerHTML = "";
  for (let index = 0; index < closed.length; index++) {
    const element = closed[index];
    document.getElementById("closed").innerHTML += generateTodoHTML(element);
  }
}
function startDragging(id) {
  currentDraggedElement = id;
}
function generateTodoHTML(element) {
  return `<div draggable="true" ondragstart="startDragging(${element["id"]})" class="todo">${element["title"]}</div>`;
}
function allowDrop(event) {
  event.preventDefault();
}
function moveTo(category) {
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}
function highlight(id) {
  console.log("Highlighting element with ID:", id);
  document.getElementById(id).classList.add("drag-area-highlight");
}
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}
