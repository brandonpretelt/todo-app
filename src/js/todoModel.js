import { v4 as uuidv4 } from 'uuid';

const todosModel = [
    {
        id: uuidv4(),
        content: '',
        done: false,
        categories: []
    }
];

export { todosModel as default };
