import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Todo } from "../model/todo.model";
import { TodoService } from "../service/todo.service";

import { HelperService } from './../helper/helper.service';

@Component({
	selector: "app-todo-list",
	templateUrl: "./component.html",
	styleUrls: ["./component.css"],
})
export class TodoListComponent implements OnInit {
	todos: Todo[];
	newTodo: Todo = new Todo();
	editing = false;
	editingTodo: Todo = new Todo();

  helper = new HelperService()

	constructor(private todoService: TodoService) {}

	ngOnInit(): void {
    this.helper.log('TodoListComponent', 'ngOnInit');

		this.getTodos();
	}

	getTodos(): void {
    this.helper.log('TodoListComponent', 'getTodos');

		this.todoService
			.getTodos()
			.toPromise()
			.then((todos) => (this.todos = todos));
	}

	createTodo(todoForm: NgForm): void {
    this.helper.log('TodoListComponent', 'createTodo');

    this.todoService
			.createTodo(this.newTodo)
			.toPromise()
			.then((createTodo) => {
				todoForm.reset();
				this.newTodo = new Todo();
				this.todos.unshift(createTodo);
			});
	}

	deleteTodo(id: string): void {
    this.helper.log('TodoListComponent', 'deleteTodo');

		this.todoService
			.deleteTodo(id)
			.toPromise()
			.then(() => {
				this.todos = this.todos.filter((todo) => todo.id !== id);
			});
	}

	updateTodo(todoData: Todo): void {
    this.helper.log('TodoListComponent', 'updateTodo');

		console.log(todoData);
		this.todoService
			.updateTodo(todoData)
			.toPromise()
			.then((updatedTodo) => {
				const existingTodo = this.todos.find(
					(todo) => todo.id === updatedTodo.id
				);
				Object.assign(existingTodo, updatedTodo);
				this.clearEditing();
			});
	}

	toggleCompleted(todoData: Todo): void {
    this.helper.log('TodoListComponent', 'toggleCompleted');

		todoData.completed = !todoData.completed;
		this.todoService
			.updateTodo(todoData)
			.toPromise()
			.then((updatedTodo) => {
				const existingTodo = this.todos.find(
					(todo) => todo.id === updatedTodo.id
				);
				Object.assign(existingTodo, updatedTodo);
			});
	}

	editTodo(todoData: Todo): void {
    this.helper.log('TodoListComponent', 'editTodo');

		this.editing = true;
		Object.assign(this.editingTodo, todoData);
	}

	clearEditing(): void {
    this.helper.log('TodoListComponent', 'clearEditing');

		this.editingTodo = new Todo();
		this.editing = false;
	}
}
