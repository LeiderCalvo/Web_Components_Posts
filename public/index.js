import "./components/PostList/PostList.js";
import "./components/Form/Form.js";
import DB from "./services/firebase.js";
class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
        DB.listenPosts((posts) => this.render(posts));
    }
    render(posts) {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./styles.css" type="text/css" >
      <section>
        <app-form></app-form>
        <app-post-list posts='${JSON.stringify(posts)}'></app-post-list>
      </section>
      `;
        }
    }
}
customElements.define("app-container", App);
