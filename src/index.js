// TODO: add categories
// ? Description of categories
// ? add a button that, when clicked, shows a user input box (text box or list of pregenerated categories*)
// ? and the user can type in a category  (or filter an existing category per the second option above*)
// ? from there, add a filter icon button and add a modal to pick which category (or categories) to display
// ? in the UI

// -- TODO: write render function when it's time
// -- TODO: use dataset attribute for html

import todoModel from './js/todoModel.js';
import { v4 as uuidv4 } from 'uuid';

let todos = [...todoModel];
let categories = [];

const addTodoBtn = document.querySelector('button[data-btn="add-todo-btn"]');
const deleteAllBtn = document.querySelector(
    'button[data-btn="delete-all-btn"]'
);

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo(todos);
    getNumberOfTasks(todos);
});

deleteAllBtn.addEventListener('click', () => {
    deleteAll(
        todos,
        document.querySelectorAll('li.done'),
        document.querySelector('.done-list')
    );
});

document.addEventListener('dblclick', (e) => {
    /* line 39: I might not need this but, I'll keep it here just in case

            if (e.target.nextElementSibling) {
            e.target.nextElementSibling.remove();
        } */
    const doneList = document.querySelector('.done-list');
    const deleteButton = `<button data-btn="delete-btn">Delete!</button>`;

    if (e.target.nodeName === 'LI') {
        const li = e.target;
        li.classList.add('done');
        li.removeAttribute('contenteditable');
        li.nextElementSibling.remove();
        li.remove();
        doneList.appendChild(li);
        li.insertAdjacentHTML('afterend', deleteButton);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'edit-btn') {
        const userInputEdit = e.target.previousElementSibling;
        if (e.target.hasAttribute('data-btn')) {
            const todoId = getId(userInputEdit, 'todoid');
            userInputEdit.classList.toggle('edit');
            editTodo(todoId, todoModel, userInputEdit);
            e.target.textContent = 'Save';
        }
        if (!userInputEdit.classList.contains('edit')) {
            userInputEdit.setAttribute('contenteditable', 'false');
            e.target.textContent = 'Edit';
        }
        if (userInputEdit.classList.contains('done')) {
            userInputEdit.removeAttribute('contenteditable');
            userInputEdit.classList.remove('edit');
        }
    }

    if (e.target.dataset.btn === 'delete-btn') {
        const li = e.target.previousElementSibling;
        const id = getId(e.target.previousElementSibling, 'todoid');
        deleteTodo(todos, id, e.target.previousElementSibling);
        document.querySelector('.current-tasks').textContent =
            getNumberOfTasks(todos) - 1;
        if (getNumberOfTasks(todos) > 0 || getNumberOfTasks(todos) < 1) {
            e.target.remove();
            if (e.target.parentNode) {
                e.target.parentNode.innerHTML = '';
            }
        }
    }
});

document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A') {
        e.preventDefault();
        filterByCategory(categories, e.target.dataset.id);
    }
});

function filterByCategory(arr, categoryLabel) {
    arr.filter((item) => {
        if (item === categoryLabel) {
            render(document.querySelector('.categories-list'), categories);
        }
    });
}

function addTodo(arr, todoName) {
    todoName = document.querySelector('#todo-form input');
    const todoList = document.querySelector('.todo-list');
    const category = document.querySelector('#category-form input');
    let newTodo;
    if (todoName.value === '') return;

    if (category.value !== '') {
        newTodo = {
            id: uuidv4(),
            content: todoName.value,
            done: false,
            categories: [category.value]
        };
    } else {
        newTodo = {
            id: uuidv4(),
            content: todoName.value,
            done: false,
            categories: []
        };
    }

    todos.push(newTodo);
    categories.push(newTodo.categories.join(' '));
    console.log(categories);

    todoName.value = '';
    category.value = '';
    document.querySelector('.current-tasks').textContent =
        getNumberOfTasks(todos);
    render(todoList, arr);
    renderCategories(document.querySelector('.categories-list'), categories);
}

function editTodo(id, arr, el) {
    el.setAttribute('contenteditable', true);

    const todoItem = arr.find((item) => {
        if (item.id === id) {
            item.content = el.textContent;
        }
    });
}

function deleteTodo(arr, id, el) {
    let modifiedTodos = arr.filter((item) => {
        if (item.id !== id) {
            return item;
        }
        el.remove();

        arr.slice(arr.indexOf(item));
    });

    todos = modifiedTodos;

    document.querySelector('.current-tasks').textContent =
        getNumberOfTasks(todos);
    return todos;
}

function deleteAll(arr, elNodeList, el) {
    elNodeList.forEach((item) => {
        let modifiedTodos = [arr.splice(arr.indexOf(item), 1)];
        if (item.classList.contains('done')) {
            arr.splice(arr.indexOf(item), modifiedTodos);
            el.innerHTML = '';
        } else if (!item.classList.contains('done')) {
            return;
        }
        document.querySelector('.current-tasks').textContent =
            getNumberOfTasks(todos);
        render(document.querySelector('.todo-list'), arr);
    });
}

function renderCategories(parent, arr) {
    parent.innerHTML = '';
    let li;
    arr.forEach((item) => {
        if (item === '') return;
        li = `<li><a data-id="${item}" href="#">${item}</a></li>`;
        parent.insertAdjacentHTML('beforeend', li);
    });
}

function render(parent, arr) {
    parent.innerHTML = '';

    let li;
    let displayValue;

    arr.forEach((item) => {
        if (item.content !== '') {
            displayValue = 'block';
            li = `<li 
            contenteditable=${item.done ? 'true' : 'false'}
            data-todoID=${item.id} 
            style="display:${displayValue};"
            class=${item.done ? 'done' : ''}
            > ${item.content}</li>
            <button data-btn="edit-btn">Edit</button>`;
        } else {
            displayValue = 'none';
            li = `<li data-remove="remove" style="display:${displayValue};"></li>`;
            document.querySelector('.current-tasks').textContent =
                getNumberOfTasks(todos) - 1;
        }
        parent.insertAdjacentHTML('beforeend', li);
    });
}

function getNumberOfTasks(arr) {
    return arr.length;
}

function getId(element, dataValue) {
    return element.dataset[dataValue];
}
