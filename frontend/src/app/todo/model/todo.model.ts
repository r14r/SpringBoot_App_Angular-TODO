export class Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: Date;

  toString() {
    return(`id=${this.id}, title=${this.title}, completed=${this.completed}, createdAt=${this.createdAt}`)
  }
}
