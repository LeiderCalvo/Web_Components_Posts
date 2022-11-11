import "../Post/Post.js";
class PostList extends HTMLElement {
    constructor() {
        super();
        this.posts = [];
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        return ["posts"];
    }
    attributeChangedCallback(_, __, posts) {
        this.posts = JSON.parse(posts);
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (!this.shadowRoot)
            return;
        const compts = this.posts.map((post) => {
            const formatted = JSON.stringify(post);
            return `<li>
        <app-post post='${formatted}'></app-post>
      </li>`;
        });
        this.shadowRoot.innerHTML = `
      <ul>
      ${compts.join("")}
      </ul>
      `;
    }
}
customElements.define("app-post-list", PostList);
