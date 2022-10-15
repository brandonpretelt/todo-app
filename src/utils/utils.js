import { v4 as uuidv4 } from 'uuid';

export const addTodo = (arr, todoName) => {
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
    // console.log(arr, '<--- hi there');
    // console.log(todos, '<--- hi there 2');
};
