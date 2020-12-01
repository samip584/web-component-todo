const todoInputTemplate = document.createElement('template');
todoInputTemplate.innerHTML = `
  <style>
    .add-todo{
      font-size: 16px;
    }
    .add-todo:hover{
      cursor: pointer;
    }
    .add-text{
      color: #686868;
    }
    .add-sign-container{
      border-radius:50%;
      background-color: #fff;
      margin-right: 10px;
      color: #be4e40;
    }
    .add-sign{
      margin-left: 5px;
    }
    .add-todo-input{
      display: none;
    }
    #todoInput{
      width:calc(100% - 20px);
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      resize: none;
      cursor: text;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .cancel-button{
      background-color: transparent;
      border: none;
      color: #555;
    }
    .cancel-button:hover{
      cursor: pointer;
      text-decoration: underline;
    }
    .add-button{
      background-color: #f4c9c5;
      background-color: #db4c3f;
      border: none;
      color: white;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 3px;
    }
    .add-button:hover{
      box-shadow: 0 1px 2px rgba(0,0,0,.15);
      cursor: pointer;
    }
  </style>

  <div>
    <div class="add-todo">
      <span class="add-sign-container">
        <svg class = "add-sign" width="13" height="13">
          <path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z" fill="currentColor" fill-rule="evenodd">
          </path>
        </svg>
      </span>
      <span class="add-text">Add Task</span>
    </div>
    <div class="add-todo-input">
      <textarea  id="todoInput" placeholder="e.g. Pet your puppy">
      </textarea>
      <button class = 'add-button'>Add task</button>
      <button class = 'cancel-button'> Cancel</button>
    </div>
  </div>
 `;

class TodoInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      document.importNode(todoInputTemplate.content, true)
    );
    this.initialAddTodo = this.shadowRoot.querySelector('.add-todo');
    this.addTodoContainer = this.shadowRoot.querySelector('.add-todo-input');
    this.addSign = this.shadowRoot.querySelector('.add-sign-container');
    this.addSignText = this.shadowRoot.querySelector('.add-text');
    this.todoInput = this.shadowRoot.querySelector('#todoInput');
    this.addButton = this.shadowRoot.querySelector('.add-button');
    this.cancelButton = this.shadowRoot.querySelector('.cancel-button');
  }

  connectedCallback() {
    this.initialAddTodo.addEventListener('mouseover', this.colorRed);
    this.initialAddTodo.addEventListener('mouseout', this.colorNormal);
    this.initialAddTodo.addEventListener('click', this.showInput);
    this.addButton.addEventListener('click', this.dispatchCreateTodoEvent);
    this.cancelButton.addEventListener('click', this.hideInput);
  }

  disconnectedCallback() {
    this.initialAddTodo.removeEventListener('mouseover', this.colorRed);
    this.initialAddTodo.removeEventListener('mouseout', this.colorNormal);
    this.initialAddTodo.removeEventListener('click', this.showInput);
    this.addButton.removeEventListener('click', this.dispatchCreateTodoEvent);
    this.cancelButton.removeEventListener('click', this.hideInput);
  }

  colorRed = (e) => {
    this.addSign.style.backgroundColor = "#dd4b39";
    this.addSign.style.color = "#fff";
    this.addSignText.style.color = "#dd4b39";
  }

  colorNormal = (e) => {
    this.addSign.style.backgroundColor = "#fff";
    this.addSign.style.color = "#be4e40";
    this.addSignText.style.color = "#686868";
  }

  showInput = (e) => {
    this.initialAddTodo.style.display = 'none';
    this.addTodoContainer.style.display = 'block';
    this.todoInput.value='';
  }

  hideInput = (e) => {
    this.initialAddTodo.style.display = 'block';
    this.addTodoContainer.style.display = 'none';
  }

  dispatchCreateTodoEvent = (e) => {
    if (!this.todoInput.value) {
      return;
    }
    this.dispatchEvent(new CustomEvent('createTodo', { bubbles: true, detail: {value: this.todoInput.value}}));
    this.todoInput.value='';
  };

  get value() {
    return this.todoInput.value;
  }

  set value(text) {
    this.todoInput.value = text;
  }
}

window.customElements.define('todo-input', TodoInput);