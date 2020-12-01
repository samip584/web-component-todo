const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    .todoItem{
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      padding: 2px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    p{
      flex:3;
    }
    .deleteTodo{
      border: none;
      border-radius: 50%;
      color: #be4e40;
      background-color: #fff;
      padding: 2px 6px;
      transition: all 0.4s ease;
    }
    .deleteTodo:hover{
      color: #fff;
      background-color: #be4e40;
      cursor: pointer;
    }
  </style>
  <div class="todoItem">
    <done-toggle completed="${todo.complete}"></done-toggle>
    <p class="todoName"></p>
    <button class="deleteTodo"> X </button>
  </div>
`;

class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ['complete'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      document.importNode(todoItemTemplate.content, true)
    );

    this.todoName = this.shadowRoot.querySelector('.todoName');
    this.todoName.innerText = this.getAttribute('name');

    this.deleteTodoBtn = this.shadowRoot.querySelector('.deleteTodo');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'complete') {
      if (newVal === 'true') {
        console.log(done);
      } else {
        console.log('remove done');
      }
    }
  }

  connectedCallback() {
    this.todoName.addEventListener('click', this.dispatchToggleEvent);
    this.deleteTodoBtn.addEventListener('click', this.dispatchDeleteEvent);
  }

  disconnectedCallback() {
    this.todoName.addEventListener('click', this.dispatchToggleEvent);
    this.deleteTodoBtn.removeEventListener('click', this.dispatchDeleteEvent);
  }

  dispatchToggleEvent = (e) => {
    this.dispatchEvent(new CustomEvent('toggleComplete', { bubbles: true }));
  };

  dispatchDeleteEvent = (e) => {
    this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
  };
}

window.customElements.define('todo-item', TodoItem);