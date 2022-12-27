function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}
const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
  task.addEventListener('dragstart', handleDragStart);
});
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}
const lists = document.querySelectorAll('.list');
lists.forEach(list => {
  list.addEventListener('dragover', handleDragOver);
});
