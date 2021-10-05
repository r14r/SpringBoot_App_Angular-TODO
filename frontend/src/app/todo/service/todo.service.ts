import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { HelperService } from "../helper/helper.service";
import { Todo } from "../model/todo.model";

@Injectable()
export class TodoService {
	private baseUrl = "http://localhost:8080";

	helper = new HelperService()

	constructor(private http: HttpClient) {}

	getTodos(): Observable<Todo[]> {
		this.helper.log('TodoService', 'getTodos');

		return this.http
			.get<Todo[]>(this.baseUrl + "/api/todos/")
			.pipe(retry(1), catchError(this.handleError));
	}

	createTodo(todo: Todo): Observable<Todo> {
		this.helper.log('TodoService', 'createTodo', `${todo}`);

		return this.http
			.post<Todo>(this.baseUrl + "/api/todos/", todo.toString())
			.pipe(retry(1), catchError(this.handleError));
	}

	updateTodo(todo: Todo): Observable<Todo> {
		this.helper.log('TodoService', 'updateTodo', todo.toString());

		return this.http
			.put<Todo>(this.baseUrl + "/api/todos/" + todo.id, todo)
			.pipe(retry(1), catchError(this.handleError));
	}

	deleteTodo(id: string): Observable<Todo> {
		this.helper.log('TodoService', 'deleteTodo');

		return this.http
			.delete<Todo>(this.baseUrl + "/api/todos/" + id)
			.pipe(retry(1), catchError(this.handleError));
	}

	private handleError(error) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}
}
