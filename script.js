const input = document.querySelector("#input");
const button = document.querySelector("#add-btn");
const list = document.querySelector("#list");



function addTodo() {
    const text = input.value.trim();
    if (text === '') return;
    const newTodo = {
        text: text,
        id: Date.now(),
        completed: false
    };

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = '';
    loadTodos();
    

}




function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    list.innerHTML = "";
    todos.forEach(todo => {
        createTodoItem(todo.text, todo.id, todo.completed);
    })
}

function createTodoItem(text, id, completed) {
    const li = document.createElement('li')
    li.classList.add("item");
    li.dataset.id = id;


    const completedClass = completed ? 'completed' : '';
    li.innerHTML = `
    <span class="${completedClass}">${text}</span>
    <button class="check-btn">✔️</button>
    <button class="delete-btn">🗑️</button>`;
    list.appendChild(li);

    const checkButton=li.querySelector(".check-btn");
    checkButton.addEventListener('click',()=> toggleCompleted(id))

    const deleteButton=li.querySelector(".delete-btn");
    deleteButton.addEventListener('click',()=> removeItem(id))
}


function removeItem(id){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter(todo=> todo.id !==id);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
    loadTodos();
}


function toggleCompleted(id){
    const todos =JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.map(todo=>{
        if(todo.id===id){
            todo.completed = !todo.completed;
        }
        return todo;

    });
    localStorage.setItem('todos',JSON.stringify(updatedTodos))
    loadTodos();
}


button.addEventListener("click", addTodo);

input.addEventListener('keydown', (e)=>{
    if(e.key === "Enter")
    addTodo();
})

window.onload =loadTodos





