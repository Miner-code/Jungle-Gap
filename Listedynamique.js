const addListButton = document.createElement('button');
addListButton.textContent = 'Ajouter une liste';
document.body.appendChild(addListButton);
addListButton.addEventListener('click', event => {
  const list = document.createElement('div');
  list.classList.add('list');
  document.body.appendChild(list);
});
function getTasksForList(listId) {
  return fetch(`/tasks?listId=${listId}`)
    .then(response => response.json());
}

getTasksForList(123).then(tasks => {
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.textContent = task.name;
    list.appendChild(taskElement);
  });
});
function deleteList(listId) {
  return fetch(`/lists/${listId}`, { method: 'DELETE' });
}

function deleteTasksForList(listId) {
  return fetch(`/tasks?listId=${listId}`, { method: 'DELETE' });
}

list.addEventListener('click', event => {
  if (event.target.classList.contains('delete-button')) {
    deleteList(list.id);
    deleteTasksForList(list.id);
    list.parentNode.removeChild(list);
  }
});
