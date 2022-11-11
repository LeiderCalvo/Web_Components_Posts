import { Post } from "../../types/types.js";
import "../Post/Post.js";

class PostList extends HTMLElement {
  posts: Post[] = [];

  static get observedAttributes() {
    return ["posts"];
  }

  attributeChangedCallback(_: string, __: string, posts: string) {
    this.posts = JSON.parse(posts);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

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
