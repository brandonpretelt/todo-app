import todoModel from './js/todoModel.js';
import { v4 as uuidv4 } from 'uuid';

function addTodo(arr) {
    let inputTextValue = document.querySelector('input');
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
    // write render function when it's time
    render(todoList, newTodo);
}
