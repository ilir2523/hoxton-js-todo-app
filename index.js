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

        const checkboxDivEl = document.createElement('div')
        checkboxDivEl.setAttribute('class', 'completed-section')

        const textDivEl = document.createElement('div')
        textDivEl.setAttribute('class', 'text-section')

        const buttonDivEl = document.createElement('div')
        buttonDivEl.setAttribute('class', 'button-section')

        const checkboxInputEl = document.createElement('input')
        checkboxInputEl.setAttribute('class', 'completed-checkbox')
        checkboxInputEl.setAttribute('type', 'checkbox')

        const textPEl = document.createElement('p')
        textPEl.setAttribute('class', 'text')
        textPEl.textContent = todo.title

        const editEl = document.createElement('button')
        editEl.setAttribute('class', 'edit')
        editEl.textContent = "edit"

        const deleteEl = document.createElement('button')
        deleteEl.setAttribute('class', 'delete')
        deleteEl.textContent = "delete"

        function listenCompletedCheckbox () {
            checkboxInputEl.checked = todo.completed
            
            checkboxInputEl.addEventListener("click", function() {
                toggleTodo(todo)
                render()
            })}

        function listenDeleteBtn() {
            // const deleteBtn = todoEl.querySelector('.delete')
            deleteEl.addEventListener('click', function () {
                deleteTodo(todo.title)
                render()
            })
        }

        listenDeleteBtn()    
        listenCompletedCheckbox()
        checkboxDivEl.append(checkboxInputEl)
        textDivEl.append(textPEl)
        buttonDivEl.append(editEl, deleteEl)
        todoEl.append(checkboxDivEl, textDivEl, buttonDivEl)
        completedList.append(todoEl)

    }
}

function renderIncompletedTodos() {
    const incompletedTodos = getIncompletedTodos()
    todoList.innerHTML = ''

    for (const todo of incompletedTodos) {
        const todoEl = document.createElement('li')
        todoEl.setAttribute('class', 'todo')

        const checkboxDivEl = document.createElement('div')
        checkboxDivEl.setAttribute('class', 'completed-section')

        const textDivEl = document.createElement('div')
        textDivEl.setAttribute('class', 'text-section')

        const buttonDivEl = document.createElement('div')
        buttonDivEl.setAttribute('class', 'button-section')

        const checkboxInputEl = document.createElement('input')
        checkboxInputEl.setAttribute('class', 'completed-checkbox')
        checkboxInputEl.setAttribute('type', 'checkbox')

        const textPEl = document.createElement('p')
        textPEl.setAttribute('class', 'text')
        textPEl.textContent = todo.title

        const editEl = document.createElement('button')
        editEl.setAttribute('class', 'edit')
        editEl.textContent = "edit"

        const deleteEl = document.createElement('button')
        deleteEl.setAttribute('class', 'delete')
        deleteEl.textContent = "delete"

        function listenCompletedCheckbox () {
            checkboxInputEl.checked = todo.completed
            
            checkboxInputEl.addEventListener("click", function() {
                toggleTodo(todo)
                render()
            })}
            
        function listenDeleteBtn() {
            // const deleteBtn = todoEl.querySelector('.delete')
            deleteEl.addEventListener('click', function () {
                deleteTodo(todo.title)
                render()
            })
        }

    listenDeleteBtn()
    listenCompletedCheckbox()
    checkboxDivEl.append(checkboxInputEl)
    textDivEl.append(textPEl)
    buttonDivEl.append(editEl, deleteEl)
    todoEl.append(checkboxDivEl, textDivEl, buttonDivEl)
    todoList.append(todoEl)
    }
}



function render() {
    turnOnOfShowCompletedCheckbox()
    renderCompletedTodos()
    renderIncompletedTodos()
}

listenTodoForm()

render()
