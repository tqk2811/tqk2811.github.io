class SaveCheckBoxElement extends HTMLElement {
    constructor(state, text, callback) {
        super();
        this._callback = null;
        if (callback == null || state == null)
            throw new Error("Invalid parameters");
        let root = this;
        this._callback = callback;
        this._input = document.createElement("input");
        this._input.type = "checkbox";
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(this._input);
        if (text && text != '') {
            this._label = document.createElement("label");
            this._label.innerText = text;
            this._label.onclick = () => { root.click(); };
            this._shadow.appendChild(this._label);
        }
        this._input.checked = state;
        this._input.onchange = this.CheckedChange.bind(this);
    }
    click() {
        this._input.click();
    }
    CheckedChange() {
        this._callback.call(this, this._input.checked);
    }
}
customElements.define('save-checkbox', SaveCheckBoxElement);
