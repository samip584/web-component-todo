import { html, render} from 'https://unpkg.com/lit-html?module';

const navTemplate= html`
  <style>
    h1{
      color: #ffffff;
      margin: 0;
    }
    .navBarContainer{
      background-color: #dc4c3f;
      padding: 5px 0px;
      text-align: center;
      color: #fefefc;
    }
  </style>
  <div class= "navBarContainer">
    <h1>Todo</h1>
  </div>
`;
class navBar extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    render(navTemplate, this.shadowRoot);
  }
}

window.customElements.define("todo-nav", navBar);
