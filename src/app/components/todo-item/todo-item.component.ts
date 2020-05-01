import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // Set dynamic classes. Dynamic class binding
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed,
    }
    return classes;
  }

  onToggle(todo:Todo) {
    // toggle in ui
    todo.completed = !todo.completed;

    // toggle in server
    this.todoService.toggleCompleted(todo).subscribe(res => {
      console.log('toggle put request: ', res);
    })
  }

  onDelete(todo:Todo) {
    this.deleteTodo.emit(todo);
  }
}
