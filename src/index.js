// TODO: write render function when it's time
// TODO: use dataset attribute for html

import todoModel from './js/todoModel.js';
import { v4 as uuidv4 } from 'uuid';

let todos = [...todoModel];

const addTodoBtn = document.querySelector('button');
const deleteAllBtn = document.querySelector(
    'button[data-btn="delete-all-btn"]'
);

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo(todos);
    console.log(todos);
    getNumberOfTasks(todos);
});

deleteAllBtn.addEventListener('click', () => {
    deleteAll(todos, document.querySelectorAll('li.done'));
});

document.addEventListener('dblclick', (e) => {
    // const doneList = document.querySelector('.done-list');
    const deleteButton = `<button data-btn="delete-btn">Delete!</button>`;
    if (e.target.nodeName === 'LI') {
        e.target.classList.add('done');
        e.target.removeAttribute('contenteditable');
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.remove();
        }

        e.target.insertAdjacentHTML('beforeend', deleteButton);
    }
});

document.addEventListener('click', (e) => {
    const todoList = document.querySelector('.todo-list');
    const editBtn = e.target.dataset.btn;
    if (editBtn === 'edit-btn') {
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
        const id = getId(e.target.parentNode, 'todoid');

        // console.log(newTodos);
        deleteTodo(todos, id, e.target.parentNode);
        // console.log(id);
        // console.log(todos);
    }
});

function addTodo(arr, todoName) {
    todoName = document.querySelector('input');
    const todoList = document.querySelector('.todo-list');
    if (todoName.value === '') return;

    let newTodo = {
        id: uuidv4(),
        content: todoName.value,
        done: false,
        categories: []
    };

    todos.push(newTodo);

    todoName.value = '';
    document.querySelector('.current-tasks').textContent =
        getNumberOfTasks(todos);
    render(todoList, arr);
    console.log(arr, '<--- hi there');
    console.log(todos, '<--- hi there 2');
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
    let newTodos = arr.filter((item) => {
        if (item.id !== id) {
            return item;
        }
        el.remove();
        arr.slice(arr.indexOf(item));
    });

    todos = newTodos;

    document.querySelector('.current-tasks').textContent =
        getNumberOfTasks(todos);
    return todos;
}

function deleteAll(arr, elNodeList) {
    elNodeList.forEach((item) => {
        if (item.classList.contains('done')) {
            arr.length = 0;
        } else if (!item.classList.contains('done')) {
            return;
        }
        document.querySelector('.current-tasks').textContent =
            getNumberOfTasks(todos);
        render(document.querySelector('.todo-list'), arr);
    });
    console.log(arr);
}

function render(parent, arr) {
    parent.innerHTML = '';

    let li;

    arr.forEach((item) => {
        li = `<li 
            contenteditable=${item.done ? 'true' : 'false'}
            data-todoID=${item.id} 
            class=${item.done ? 'done' : ''}
            > ${item.content}</li><button data-btn="edit-btn">Edit</button>`;
        parent.insertAdjacentHTML('beforeend', li);
    });
    /*     console.log(arr.length);
    console.log(arr); */
}

function getNumberOfTasks(arr) {
    console.log(arr.length);
    return arr.length;
}

function getId(element, dataValue) {
    return element.dataset[dataValue];
}
