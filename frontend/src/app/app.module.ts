import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { TodoService } from "./todo/service/todo.service";
import { TodoListComponent } from "./todo/component/component";

@NgModule({
	declarations: [AppComponent, TodoListComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
	],
	providers: [TodoService],
	bootstrap: [AppComponent],
})
export class AppModule {}
