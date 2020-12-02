class ToDoApp {
  constructor() {
    this.todos = this.getTodos();
    this.todoList = document.querySelector('#todoList');

    this.createTodoEventHandler();
    this.toggleCompletedEventHandler();
    this.deleteTodoEventHandler();

    this.renderTodos();
  }

  createTodoEventHandler = () => {
    window.addEventListener('createTodo', (e) => {
      const todo = {
        id: +new Date(),
        name: e.detail.value,
        complete: false,
      };

      this.todos = [...this.todos, todo];
      this.todoList.innerHTML =
         this.todoList.innerHTML + this.getTodoElement(todo);

      this.saveTodos();
    });
  };

  toggleCompletedEventHandler = () => {
    this.todoList.addEventListener('toggleComplete', (e) => {
      const todoElement = e.target;
      const todoItemInArray = this.todos.find(
        (todo) => todo.id === +todoElement.id
      );
      todoItemInArray.complete = !todoItemInArray.complete;
      todoElement.setAttribute('complete', todoItemInArray.complete)
      this.saveTodos();
    });
  };

  deleteTodoEventHandler = () => {
    this.todoList.addEventListener('deleteTodo', (e) => {
      const todoElement = e.target;
      const todos = this.todos.filter((todo) => todo.id !== +todoElement.id);
      this.todos = todos;
      this.todoList.removeChild(todoElement);

      this.saveTodos();
    });
  };

  saveTodos = () => {
    const todos = JSON.stringify(this.todos);
    localStorage.setItem('todos', todos);
  };

  getTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    return todos;
  };

  renderTodos = () => {
    const todos = this.todos.map((todo) => this.getTodoElement(todo));

    this.todoList.innerHTML = [...todos].join('');
  };

  getTodoElement(todo) {
    return `<todo-item id="${todo.id}" 
            name="${todo.name}" 
            complete="${todo.complete}">
          </todo-item>`;
  }
}

new ToDoApp();
