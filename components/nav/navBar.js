const navTemplate = document.createElement('template');
navTemplate.innerHTML = `
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
    this.shadowRoot.appendChild(document.importNode(navTemplate.content, true));
  }
}

window.customElements.define("todo-nav", navBar);
