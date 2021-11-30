// How to work with state:
// 1. create some state
// 2. render the app based on the state
// 3. update the state
// 4. rerender the app based on the new state

const showCompletedCheckbox = document.querySelector(".show-completed-checkbox")
const addItemForm = document.querySelector(".add-item")
const todoList = document.querySelector(".todo-list")
const completedList = document.querySelector(".completed-list")

console.log(todoList)
const state = {

    todos: [
        {
            title: 'Go shopping',
            completed: false,
            
        },
        {
            title: 'Read',
            completed: false,
            
        },
        {
            title: 'Cook dinner',
            completed: false,
            
        },
        {
            title: 'Learn JS',
            completed: false,
            
          },
        {
            title: 'Chill',
            completed: true,
            
        }
    ],

    showCompleted: false,
    
}

function listenTodoForm() {
    addItemForm.addEventListener("submit", function (e) {
        e.preventDefault()

        const todo = {
            title: addItemForm.text.value,
            completed: false,
            
        }

        state.todos.push(todo)

        renderIncompletedTodos(todo)
        addItemForm.reset()
    })
}

function listenShowCompletedCheckbox() {
    showCompletedCheckbox.addEventListener("click", function () {
        state.showCompleted = showCompletedCheckbox.checked
        render()
    })
    return state.showCompleted
}
function turnOnOfShowCompletedCheckbox(){
    const completedSection = document.querySelector('section.completed-section')
    if (listenShowCompletedCheckbox() == true) {
        showCompletedCheckbox.checked = true
        completedSection.style.display = 'block'
    } else {
        showCompletedCheckbox.checked = false
        completedSection.style.display = 'none'
    }
}



function getCompletedTodos() {
    return state.todos.filter(function (todo) {
        return todo.completed
    })
}

function getIncompletedTodos() {
    return state.todos.filter(function (todo) {
        return !todo.completed
    })
}

function toggleTodo(todo) {
    todo.completed = !todo.completed
}

function addTodo(todo) {
    state.todos.push(todo)
}

function deleteTodo(text) {
    state.todos = state.todos.filter(function (todo) {
        return todo.title !== text
    })
}


  function renderCompletedTodos() {
    const completedTodos = getCompletedTodos()
    completedList.innerHTML = ''

    for (const todo of completedTodos) {
        const todoEl = document.createElement('li')
        todoEl.setAttribute('class', 'todo completed')

        todoEl.innerHTML = `
        <div class="completed-section">
            <input class="completed-checkbox" type="checkbox" />
        </div>
        <div class="text-section">
            <p class="text">${todo.title}</p>
        </div>
        <div class="button-section">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `
        function listenDeleteBtn() {
            const deleteBtn = todoEl.querySelector('.delete')
            deleteBtn.addEventListener('click', function () {
                deleteTodo(todo.title)
                render()
            })
        }
        
        function lstenCompletedCheckbox () {
            const completedCheckbox = todoEl.querySelector('.completed-checkbox')
            completedCheckbox.checked = todo.completed
            
            completedCheckbox.addEventListener("click", function() {
                toggleTodo(todo)
                render()
            })}

        listenDeleteBtn()    
        lstenCompletedCheckbox ()
        
        completedList.append(todoEl)
    }
}

function renderIncompletedTodos() {
    const incompletedTodos = getIncompletedTodos()
    todoList.innerHTML = ''

    for (const todo of incompletedTodos) {
    const todoEl = document.createElement('li')
    todoEl.setAttribute('class', 'todo')

    todoEl.innerHTML = `
    <div class="completed-section">
        <input class="completed-checkbox" type="checkbox" />
    </div>
    <div class="text-section">
        <p class="text">${todo.title}</p>
    </div>
    <div class="button-section">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>
    `
    function listenDeleteBtn() {
        const deleteBtn = todoEl.querySelector('.delete')
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.title)
            render()
        })
    }
    
    function lstenCompletedCheckbox () {
        const completedCheckbox = todoEl.querySelector('.completed-checkbox')
        completedCheckbox.checked = todo.completed
        
        completedCheckbox.addEventListener("click", function() {
            toggleTodo(todo)
            render()
        })}

    listenDeleteBtn()
    lstenCompletedCheckbox()
    
    todoList.append(todoEl)
    }
}



function render() {
    listenTodoForm()
    turnOnOfShowCompletedCheckbox()
    renderCompletedTodos()
    renderIncompletedTodos()
}

render()
