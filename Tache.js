const TaskStatus = Object.freeze({
  NONE: '',
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé'
});

class Task {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
}

const task1 = new Task('Faire la vaisselle', TaskStatus.IN_PROGRESS);
const task2 = new Task('Réparer la voiture', TaskStatus.COMPLETED);
const task3 = new Task('Appeler le client', TaskStatus.PENDING);
