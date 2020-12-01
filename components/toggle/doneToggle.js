const doneToggleTemplate = document.createElement('template');
doneToggleTemplate.innerHTML = `
  <style>
    .done-toggle{
      margin-right: 10px;
      position: relative;00
    }
    .done-toggle label {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
      height: 18px;
      left: 0;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .done-toggle label:after {
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      content: "";
      height: 5px;
      left: 3px;
      opacity: 0;
      position: absolute;
      top: 4px;
      transform: rotate(-45deg);
      width: 10px;
    }

    .done-toggle input[type="checkbox"] {
      visibility: hidden;
    }

    .done-toggle input[type="checkbox"]:checked + label {
      background-color: #66bb6a;
      border-color: #66bb6a;
    }

    .done-toggle input[type="checkbox"]:checked + label:after {
      opacity: 1;
    }
  </style>

  <div class="done-toggle">
    <input type="checkbox" id="checkbox" />
    <label for="checkbox"></label>
  </div>
`

class DoneToggle extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      document.importNode(doneToggleTemplate.content, true)
    );
  }
}

window.customElements.define('done-toggle', DoneToggle);
