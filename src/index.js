// TODO: write render function when it's time
// TODO: use dataset attribute for html

import todoModel from './js/todoModel.js';
import { v4 as uuidv4 } from 'uuid';

let todos = [...todoModel];

const addTodoBtn = document.querySelector('button');

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // addTodo(todoModel);
    addTodo(todos);
});

document.addEventListener('dblclick', (e) => {
    const doneList = document.querySelector('.done-list');
    if (e.target.nodeName === 'LI') {
        e.target.classList.add('done');
        e.target.nextElementSibling.remove();
        e.target.remove();
        doneList.append(e.target);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const userInputEdit = e.target.previousElementSibling;
        if (e.target.hasAttribute('data-btn')) {
            const todoId = getId(userInputEdit, 'todoid');
            userInputEdit.classList.toggle('edit');
            editTodo(todoId, todoModel, userInputEdit);
        }
        if (userInputEdit.classList.contains('done')) {
            userInputEdit.removeAttribute('contenteditable');
            userInputEdit.classList.remove('edit');
        }
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

    console.log(arr);

    todoName.value = '';
    render(todoList, arr);
}

function editTodo(id, arr, el) {
    el.setAttribute('contenteditable', true);

    const todoItem = arr.find((item) => {
        if (item.id === id) {
            item.content = el.textContent;
        }
    });
}

function render(parent, arr) {
    parent.innerHTML = '';
    arr.forEach((item) => {
        li = `<li 
            data-todoID=${item.id} 
            class=${item.done ? 'done' : ''}
            contenteditable="true"> ${
                item.content
            }</li><button data-btn="edit-btn">Edit Me</button>`;
        parent.insertAdjacentHTML('beforeend', li);
    });
    /*     console.log(arr.length);
    console.log(arr); */
}

function getId(element, dataValue) {
    return element.dataset[dataValue];
}
