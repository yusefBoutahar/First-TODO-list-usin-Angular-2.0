import { Component, VERSION } from '@angular/core';

type task = {
  id?: number;
  title: string;
  completed: boolean;
  date?: Date;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private listTasks: task[] = [];
  private auxlist: task[] = [];
  private TODAY: string = 'TODAY';
  private autoincrementId: number = 4;

  public task: task = {
    title: 'First Task',
    completed: false,
    date: new Date('2022-03-10'),
  };

  constructor() {
    //inicializamos par de datos para probar
    this.listTasks = [
      {
        id: 1,
        title: 'First Task',
        completed: false,
        date: new Date('2022-03-10'),
      },
      {
        id: 2,
        title: 'Salir a caminar',
        completed: false,
        date: new Date('2022-03-15'),
      },
      {
        id: 3,
        title: 'Realizar listTasksa TODO Angular',
        completed: true,
        date: new Date('2022-03-27'),
      },
    ];
  }

  getFilterText(): string {
    return this.TODAY;
  }
  isNewTask(tu: task): boolean {
    return !this.auxlist.some((ts) => ts.id === tu.id);
  }

  showAllTasks(): void {
    this.listTasks.filter((t) =>
      this.isNewTask(t) ? this.auxlist.push(t) : t
    );
    this.listTasks = JSON.parse(JSON.stringify(this.auxlist));
  }

  beforeToday(date: Date): boolean {
    return new Date(date).getDate() < new Date().getDate();
  }
  isTaskToday(t: task) {
    return new Date(t.date).getDate() == new Date().getDate();
  }

  showTodayTasks(): void {
    this.auxlist = JSON.parse(JSON.stringify(this.listTasks)); // guardamos la lista de las task antes del filtro
    let aux = this.listTasks.filter(this.isTaskToday);
    this.listTasks = aux;
  }
  changeFilter(): void {
    if (this.TODAY.includes('TODAY')) {
      // usuario pulsa boton de filtro
      this.TODAY = 'QUIT FILTER';
      this.showTodayTasks();
    } else {
      // usuario pulsa boton de filtro para restablecer todas las tasks
      this.TODAY = 'TODAY';
      this.showAllTasks();
    }
  }

  addToListTasks(): void {
    if (this.task.title.length == 0) return;
    const newTask: task = {
      id: this.autoincrementId++,
      title: this.task.title,
      completed: false,
      date: new Date(),
    };
    this.task.title = '';
    this.listTasks.push(newTask);
  }

  removeToListTasks(index: number): void {
    this.listTasks.splice(index, 1);
  }

  removeAllListTasks(): void {
    this.listTasks = [];
  }

  completeAllTasks(): void {
    this.listTasks.forEach((t) => (t.completed = true));
  }
  unCompleteAllTasks(): void {
    this.listTasks.forEach((t) => (t.completed = false));
  }
  getListTasks(): task[] {
    return this.listTasks;
  }

  isCompleted(task: task): void {
    if (task.completed == false) {
      task.completed = true;
    } else {
      task.completed = false;
    }
  }
}
