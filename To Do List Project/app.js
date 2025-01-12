const taskInput = document.querySelector('#input_task');
const addBtn = document.querySelector('.addBtn');
const ul = document.querySelector('.list-items');

function addTask() {
    const li = document.createElement('li');
    li.classList.add('list-item');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'list-checkbox');

    input.addEventListener('click', () => {
        checkCompletedTask(input, p);
    });

    const p = document.createElement('p');
    p.classList.add('task-name');
    p.textContent = taskInput.value;
    if (taskInput.value == '') {
        li.style.display = 'none';
        alert('Enter Task First ');
    }


    const delbtn = document.createElement('button');
    delbtn.classList.add('deleteBtn');
    delbtn.textContent = 'delete';

    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(delbtn);
    ul.appendChild(li);

    taskInput.value = '';
}

function removeTask() {
    ul.addEventListener("click", function (e) {
        if (e.target.classList.contains("deleteBtn")) {
            e.target.parentElement.remove();
        }
    });
}

function checkCompletedTask(input, p) {
    if (input.checked) {
        p.style.textDecoration = 'line-through';
    } else {
        p.style.textDecoration = 'none';
    }
}

removeTask();
addBtn.addEventListener('click', addTask);
addBtn.addEventListener('keypress', addTask);

