import { html, render} from 'https://unpkg.com/lit-html?module';

class TodoItem extends HTMLElement {
  constructor() {
    super();
    let complete = this.getAttribute('complete');
    const todoItemTemplate = html`
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
        <done-toggle complete="${complete}"></done-toggle>
        <p class="todoName">${this.getAttribute('name')}</p>
        <button class="deleteTodo"> X </button>
      </div>
    `;
    this.attachShadow({ mode: 'open' });
    render(todoItemTemplate, this.shadowRoot);
    
    
    this.todoItem = this.shadowRoot.querySelector('.todoItem');
    this.deleteTodoBtn = this.shadowRoot.querySelector('.deleteTodo');
    this.toggleCompletedEventHandler();

  }

  

  connectedCallback() {
    this.deleteTodoBtn.addEventListener('click', this.dispatchDeleteEvent);
  }

  disconnectedCallback() {
    this.deleteTodoBtn.removeEventListener('click', this.dispatchDeleteEvent);
  }

  dispatchDeleteEvent = (e) => {
    this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
  };
  toggleCompletedEventHandler = () => {
    this.todoItem.addEventListener('toggle', (e) => {
      this.dispatchEvent(new CustomEvent('toggleComplete', { bubbles: true}));
    });
  }
}

window.customElements.define('todo-item', TodoItem);
