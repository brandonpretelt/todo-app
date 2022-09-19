import { todoModel } from './js/todoModel.js';

function render(arr) {}

function deleteTodo(arr, id, fn) {
    let deleted = arr.filter((todo) => {
        if (todo.id !== id) {
            return todo;
        }
    });
    fn(deleted);
}

console.log(todoModel);
