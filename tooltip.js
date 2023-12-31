class Tooltip extends HTMLElement {
  constructor() {
    // Fixing error: Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor at new Tooltip
    super();
    this._tooltipContainer;
    this._tooltipText = "This is the tooltip text placeholder.";
    // creating a shadow DOM
    this.attachShadow({ mode: "open" });
    // after the above line, now shadowRoot is available
    this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: grey;
                color: white;
                z-index: 10;
                position: absolute;
            }
        </style>
        <slot>Default text</slot>
        <span> (?) </span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  // pseudo private method
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  // pseudo private method
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  attributeChangedCallback() {}
  disconnectedCallback() {}
}

customElements.define("kb-tooltip", Tooltip);
