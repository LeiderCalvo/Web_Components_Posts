import DB from "../../services/firebase.js";
import { Post } from "../../types/types.js";

class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.mount();
  }

  mount() {
    this.render();
    this.addListeners();
  }

  addListeners() {
    const form = this.shadowRoot?.querySelector("form");
    form?.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;

      const inputTitle = target.elements[0] as HTMLInputElement;
      const inputImg = target.elements[1] as HTMLInputElement;
      const inputBody = target.elements[2] as HTMLInputElement;

      const newPost: Post = { title: inputTitle.value, img: inputImg.value, body: inputBody.value };
      DB.addPost(newPost);
    });
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/Form/styles.css" type="text/css" >
      <article>
      <h1>Add a Post</h1>
      <h2>Let's create your post!</h2>
        <form>
          <label for="titulo">Titulo</label>
          <input name="titulo" />

          <label for="imagen">Imagen</label>
          <input name="imagen" />

          <label for="descripcion">Descripcion</label>
          <textarea name="descripcion"></textarea>

          <button type="submit">save</button>
        </form>
      </article>
      `;
    }
  }
}

customElements.define("app-form", Form);
