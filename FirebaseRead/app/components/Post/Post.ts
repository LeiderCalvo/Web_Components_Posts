import { Post } from "../../types/types";

class AppPost extends HTMLElement {
  post?: Post;

  static get observedAttributes() {
    return ["post"];
  }

  attributeChangedCallback(_: string, __: string, posts: string) {
    this.post = JSON.parse(posts) as Post;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot && this.post) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/Post/styles.css" type="text/css" >
      <section>
      <img src="${this.post.img}" alt="imagen del post" />
      <h3>${this.post.title}</h3>
      <p>${this.post.body}</p>
      </section>`;
    }
  }
}

customElements.define("app-post", AppPost);
