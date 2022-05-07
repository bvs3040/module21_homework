const btn = document.querySelector('#reqwest');
const textField = document.querySelector('input');
const todoList = document.querySelector('.todo');
const title = document.querySelector('h3');
document.querySelector('input').addEventListener('click', () => {
    todoList.innerHTML = "";
    title.innerHTML = "";
})

btn.addEventListener('click', () => {
    let userId = textField.value ? textField.value : 0;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            return new Promise((resolve, reject) => {
                if (data.length) {
                    resolve(data);
                } else {
                    reject()
                }
            })
        })
        .then((data) => {
            title.innerHTML = `Список задач пользователя с ID = ${userId} :`
            for (let i = 0; i < data.length; i++) {
                const newTodo = document.createElement("li");
                const newTodoContent = document.createTextNode(data[i].title);
                newTodo.appendChild(newTodoContent);
                todoList.appendChild(newTodo);
                if (data[i].completed) {
                    newTodo.classList.add("completed");
                }
            }
        })
        .catch(() => {
            todoList.innerHTML = "";
            title.innerHTML = `Пользователь с ID = ${userId} не найден.`;
        })
    textField.value = '';

})