let todos = []

let completed = []

let global_id = 0;

function init() {
    let newTodo1 = { id: generateID(), content: "Купить хлеб" };
    let newTodo2 = { id: generateID(), content: "Сделать задание todoList" };
    let newTodo3 = { id: generateID(), content: "Выгулять собаку" };
    addTask({ id: generateID(), content: "Купить хлеб" });
    addTask({ id: generateID(), content: "Сделать задание todoList" });
    addTask({ id: generateID(), content: "Выгулять собаку" });

    let newDone = { id: generateID(), content: "Купить сок 😋" };
    completed.push(newDone);

    update_view();

    document.getElementById("new-task").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("add-task-btn").click();
        }
    })
}

function update_view() {
    let todo_list = document.getElementById("todo-list");

    while (todo_list.firstChild) {
        todo_list.removeChild(todo_list.firstChild);
    }

    todos.forEach((item) => {
        let task = createTodoElement(item);
        
        todo_list.appendChild(task);
    })

    const completed_list = document.getElementById("done-list");

    while (completed_list.firstChild) {
        completed_list.removeChild(completed_list.firstChild);
    }

    completed.forEach((item) => {
        let task = document.createElement("li");
        task.innerHTML = `
            <span class="completed">${item.content}</span>
            <button class="delete-btn" onclick="deleteTask(${item.id})">❌</button>
        `;
        
        completed_list.appendChild(task);
    })
}

function toggleTask(id) {
    const task = todos.find((item) => {
        return item.id == id;
    });

    const index = todos.indexOf(task);
    todos.splice(index, 1);

    completed.push(task);
    update_view();
}

function addTask(task) {
    let newTask = null;

    if (task != null) {
        newTask = task;
    } else {
    
        const taskInput = document.getElementById('new-task');
        const taskText = taskInput.value.trim();
    
        if (taskText === "") return;
        newTask = {id: generateID(), content: taskText };
        taskInput.value = "";
    }

    todos.push(newTask);

    update_view();

    setTimeout(() => {
        alert(`Не забудь про: ${newTask.content}`)
    }, 10000)
}



function deleteTask(id) {
    let task = todos.find((item) => {
        return item.id == id;
    });

    if (task != null) {
        const index = todos.indexOf(task);
        todos.splice(index, 1);
    } 

    task = completed.find((item) => {
        return item.id == id;
    })
    if (task) {
        const index = completed.indexOf(task);
        completed.splice(index, 1);
    } 

    update_view();

}

function editTask(id) {
    const task = todos.find((item) => { return item.id == id; });
    const newTaskText = prompt('Редактировать задачу:', task.content);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.content = newTaskText.trim();
    }

    update_view();
}

function createTodoElement(task) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox" onclick="toggleTask(${task.id})">
        <span>${task.content}</span>
        <button class="edit-btn" onclick="editTask(${task.id})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">❌</button>
    `;

    return newTask;
}

function generateID() {
    global_id++;
    return global_id;
}

document.addEventListener("DOMContentLoaded", init);
