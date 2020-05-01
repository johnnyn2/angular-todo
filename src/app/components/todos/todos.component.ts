import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // delete on ui
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // delete on server
    this.todoService.deleteTodo(todo).subscribe(res => {
      // this.todos = this.todos.filter(t => t.id !== todo.id);
      console.log('res from delete: ', res);
    });
  }

  addTodo(todo: Todo) {
    // add on ui
    const newTodo = { ...todo };
    newTodo.id = this.todos[this.todos.length-1].id + 1;
    this.todos.push(newTodo);

    // add on server
    this.todoService.addTodo(todo).subscribe(res => {
      // const newTodo = {
      //   ...todo,
      //   id: this.todos[this.todos.length - 1].id + 1,
      // }
      // this.todos.push(newTodo);
      console.log('res from post:', res);
    })
  }
}
