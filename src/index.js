// TODO: write render function when it's time
// TODO: use dataset attribute for html

import todoModel from './js/todoModel.js';
import { v4 as uuidv4 } from 'uuid';

const addTodoBtn = document.querySelector('button');

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo(todoModel);
});

document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.hasAttribute('data-btn')) {
            const todoId = getId(e.target.previousElementSibling, 'todoid');
            e.target.previousElementSibling.classList.toggle('edit');
            editTodo(todoId, todoModel, e.target.previousElementSibling);
            e.target.textContent = 'Save';
        }
    }
});

function addTodo(arr) {
    let inputTextValue = document.querySelector('input');
    const todoList = document.querySelector('.todo-list');

    if (inputTextValue.value === '') return;

    let newTodo = arr.map((item) => {
        item.id = uuidv4();
        item.content = inputTextValue.value;
        item.done = false;
        item.categories = [];

        return {
            id: item.id,
            content: item.content,
            done: item.done,
            categories: item.categories
        };
    });

    inputTextValue.value = '';
    render(todoList, newTodo);
}

function editTodo(id, arr, el) {
    el.setAttribute('contenteditable', true);

    const todoItem = arr.find((item) => {
        if (item.id === id) {
            console.log(item.content);
            item.content = el.textContent;
        }
    });

    // arr.push({
    //     ...todoModel,
    //     content: todoItem.content
    // });
    console.log(todoItem);
    console.log(arr);
}

function completeTodo(todoItem) {
    if (todoItem.done === 'true') {
        todoItem.classList.add('done');
    }
}

function render(parent, arr) {
    let li;
    arr.forEach((item) => {
        li = `<li 
            data-todoID=${item.id} 
            class=${item.done ? 'done' : ''}
            contenteditable="true">${
                item.content ? item.content : 'no no no'
            }</li><button data-btn="edit-btn">Edit Me</button> `;
        parent.insertAdjacentHTML('beforeend', li);
    });
}

function getId(element, dataValue) {
    return element.dataset[dataValue];
}
